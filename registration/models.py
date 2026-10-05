from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    program = models.CharField(max_length=100)
    year_level = models.CharField(max_length=20)

    def __str__(self):
        return self.name