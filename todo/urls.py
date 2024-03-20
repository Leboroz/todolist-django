from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("delete-task/<int:id>/", views.delete_task, name="delete"),
    path("<int:id>/", views.view_task, name="view"),
    path("update-completed/", views.update_completed, name="update"),
]
