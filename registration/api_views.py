from django.http import JsonResponse
from .models import Student


def student_api(request):
    if not request.user.is_authenticated:
        return JsonResponse(
            {"error": "Authentication required."},
            status=401
        )

    students = Student.objects.all()

    data = {
        "count": students.count(),
        "students": [
            {
                "id": student.id,
                "student_name": student.student_name,
                "program": student.program,
                "year_level": student.year_level,
                "email": student.email,
            }
            for student in students
        ]
    }

    return JsonResponse(data)