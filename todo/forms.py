from django import forms
from .models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ('task_title', 'task_description')

        widgets = {
                "completed": forms.CheckboxInput(),
                "task_title": forms.TextInput(attrs={"placeholder": "Title"}),
                "task_description": forms.Textarea(attrs={"placeholder": "Description"}),
                }
