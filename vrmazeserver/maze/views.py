from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from maze.models import Mazegen, GrowingTree, MazeDumper
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render
import json

def last_maze(request):
    maze_json_dump = MazeDumper.objects.order_by('-id')[0].maze_json_dump
    maze = maze_json_dump
    maze = json.loads(maze_json_dump)
    return render( request, 'last_maze.html', { 'maze': maze } )

def generate_maze(request):
    maze_gen = GrowingTree(size=3)
    maze = maze_gen.generate_maze()

    response_data = {}
    for node in maze:
        str_node = str(node[0]) + ',' + str(node[1])
        response_data[str_node] = maze[node]

    response_data = json.dumps(response_data)

    dumper = MazeDumper(maze_json_dump=response_data)
    dumper.save()

    return HttpResponse(response_data, content_type="application/json")
