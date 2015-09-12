#pragma strict

function Start () {

}

function FixedUpdate () {
    if ( Input.touchCount > 0 ) {
        Debug.Log( Input.GetTouch(0).phase );
    }
}

function Update () {

}
