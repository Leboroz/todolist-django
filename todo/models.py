from django.db import models

class Task(models.Model):
    task_title = models.CharField(max_length=150)
    task_description = models.CharField(max_length=500)
    task_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.task_title
