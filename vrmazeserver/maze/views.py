from django.shortcuts import render
from django.http import JsonResponse
from maze.models import Mazegen, GrowingTree

def generate_maze(request):
    maze_gen = GrowingTree(size=3)
    maze = maze_gen.generate_maze()

    # Ключи структуры должны быть строками для дампа в json
    res = {}
    for node in maze:
        str_node = str(node[0]) + ',' + str(node[1])
        res[str_node] = maze[node]

    return JsonResponse(res)
