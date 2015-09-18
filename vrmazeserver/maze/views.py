from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from maze.models import Mazegen, GrowingTree, MazeDumper
import json

def last_maze(request):
    response_data = MazeDumper.objects.order_by('-id')[0]
    return HttpResponse(json.dumps(response_data.maze_json_dump), content_type="application/json")

def generate_maze(request):
    maze_gen = GrowingTree(size=3)
    maze = maze_gen.generate_maze()

    response_data = {}
    for node in maze:
        str_node = str(node[0]) + ',' + str(node[1])
        response_data[str_node] = maze[node]

    dumper = MazeDumper(maze_json_dump=response_data)
    dumper.save()

    return HttpResponse(json.dumps(response_data), content_type="application/json")
