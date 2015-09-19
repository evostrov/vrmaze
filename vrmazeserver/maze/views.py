from django.template.defaulttags import register
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.conf import settings
from maze.models import Mazegen, GrowingTree, MazeDumper
import json
import logging

logging.basicConfig(filename="/home/evostrov/py/debug.log", level=logging.INFO)

@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)

def last_maze(request):
    maze_json_dump = MazeDumper.objects.order_by('-id')[0].maze_json_dump
    maze = json.loads(maze_json_dump)

    return render(request, 'last_maze.html', {'maze': maze, 'size_range': range(settings.MAZE_SIZE), 'size': settings.MAZE_SIZE})

def generate_maze(request):
    maze_gen = GrowingTree(size=settings.MAZE_SIZE)
    maze_gen.generate_maze()

    response_data = maze_gen.to_json()

    dumper = MazeDumper(maze_json_dump=response_data)
    dumper.save()

    return HttpResponse(response_data, content_type="application/json")
