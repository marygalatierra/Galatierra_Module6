from django.urls import path
from .api_views import student_api

urlpatterns = [
    path("students/", student_api, name="student_api"),
]