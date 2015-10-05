#pragma strict

import SimpleJSON;

var LonWallPrefab : GameObject;
var LatWallPrefab : GameObject;
var StartFloorPrefab : GameObject;
var BiDirStartFloorPrefab : GameObject;
var FinishFloorPrefab : GameObject;

function Start () {
    var url = "http://5-63-157-114.ovz.vps.regruhosting.ru/generate_maze";
    var www : WWW = new WWW(url);

    yield www;

    if ( www.error == null ) {
        var answer = JSON.Parse(www.text);

        var maze_dump = answer['maze_dump'];
        var maze_size = parseInt( answer['size'].ToString().Replace("\"", "") );

        var wall_length = LonWallPrefab.transform.localScale.x;
        var wall_width = LonWallPrefab.transform.localScale.z;

        for ( var x = 0; x < maze_size; x++ ) {
            for ( var z = 0; z < maze_size; z++ ) {
                var node_x0 = x*wall_length;
                var node_z0 = z*wall_length;

                var node_directions = maze_dump[x + ',' + z].ToString();

                if ( x == 0 && z == 0 ) {
                    var start_floor_z_rotate = 0;
                    if ( node_directions.Contains("S") ) { start_floor_z_rotate = 270; }

                    if ( node_directions.Contains("S") && node_directions.Contains("W") ) {
                        var bi_dir_start_node = Instantiate(
                            BiDirStartFloorPrefab,
                            new Vector3(5, 0.1f, 5),
                            Quaternion.Euler(90, 0, 0)
                        );
                    }
                    else {
                        var start_node = Instantiate(
                            StartFloorPrefab,
                            new Vector3(5, 0.1f, 5),
                            Quaternion.Euler(90, 0, start_floor_z_rotate)
                        );
                    }
                }
                else if ( x == maze_size-1 && z == maze_size-1 ) {
                    var finish_floor_z_rotate = 0;
                    if ( node_directions.Contains("N") ) { finish_floor_z_rotate = 270; }

                    var finish_node = Instantiate(
                        FinishFloorPrefab,
                        new Vector3( node_x0 + wall_length/2, 0.1f, node_z0 + wall_length/2 ),
                        Quaternion.Euler(90, 0, finish_floor_z_rotate)
                    );
                }

                if ( ! node_directions.Contains("N") ) {
                    var n_wall = Instantiate(
                        LatWallPrefab,
                        new Vector3( node_x0 + wall_width/2, 2, node_z0 + wall_length/2 ),
                        Quaternion.identity
                    );
                }
                if ( ! node_directions.Contains("S") ) {
                    var s_wall = Instantiate(
                        LatWallPrefab,
                        new Vector3( node_x0 + wall_length - wall_width/2, 2, node_z0 + wall_length/2 ),
                        Quaternion.identity
                    );
                }
                if ( ! node_directions.Contains("E") ) {
                    var e_wall = Instantiate(
                        LonWallPrefab,
                        new Vector3( node_x0 + wall_length/2, 2, node_z0 + wall_width/2 ),
                        Quaternion.identity
                    );
                }
                if ( ! node_directions.Contains("W") ) {
                    var w_wall = Instantiate(
                        LonWallPrefab,
                        new Vector3( node_x0 + wall_length/2, 2, node_z0 + wall_length - wall_width/2 ),
                        Quaternion.identity
                    );
                }
            }
        }
    }
    else {
        Debug.Log("WWW Error: "+ www.error);
    }
}

function Update () {

}
