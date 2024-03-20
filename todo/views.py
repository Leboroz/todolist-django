from django.shortcuts import  redirect, render
from django.urls import reverse
from django.utils.html import json
from .models import Task
from .forms import TaskForm

def index(request):
    tasks = Task.objects.all().order_by('-task_completed')
    
    if request.method == 'POST' and "create" in request.POST:
        form = TaskForm(request.POST)
        if form.is_valid():
            new_task = form.save(commit=False)
            new_task.save()
            return redirect('index')

    elif request.method == 'POST' and "update" in request.POST:
        task = Task.objects.get(id=request.POST["update"])
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return redirect('index')

    else:
        form = TaskForm()

    context = {'tasks': tasks, 'form': form}
    return render(request, 'todos/index.html', context)

def delete_task(request, id):
    task = Task.objects.get(id=id)
    task.delete()
    return redirect('/')

def view_task(request, id):
    task = Task.objects.get(id=id)
    return render(request, "todos/view.html", { "task":task })

def update_completed(request):
    if request.method == "POST":
        print(request.body)
        jsonData = json.loads(request.body)
        task_id = jsonData.get('id')
        task = Task.objects.get(id=task_id)
        task.task_completed = jsonData.get('completed')
        task.save()
    return redirect('/')
