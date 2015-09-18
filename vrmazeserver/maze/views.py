from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from maze.models import Mazegen, GrowingTree
import json

def generate_maze(request):
    maze_gen = GrowingTree(size=3)
    maze = maze_gen.generate_maze()

    response_data = {}
    for node in maze:
        str_node = str(node[0]) + ',' + str(node[1])
        response_data[str_node] = maze[node]

    return HttpResponse(json.dumps(response_data), content_type="application/json")
