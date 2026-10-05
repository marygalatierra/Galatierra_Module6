from django.db import models


class Student(models.Model):
    student_name = models.CharField(max_length=100)
    program = models.CharField(max_length=100)
    year_level = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return self.student_name