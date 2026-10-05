from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from .models import Student


@login_required
def student_dashboard(request):
    students = Student.objects.all().order_by('name')

    programs = (
        Student.objects
        .values_list('program', flat=True)
        .distinct()
        .order_by('program')
    )

    return render(
        request,
        'registration/student_dashboard.html',
        {
            'students': students,
            'programs': programs,
            'total_students': students.count(),
        }
    )


@login_required
def student_list(request):
    students = Student.objects.all().order_by('name')

    return render(
        request,
        'registration/student_list.html',
        {'students': students}
    )


@login_required
def student_create(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        program = request.POST.get('program', '').strip()
        year_level = request.POST.get('year_level', '').strip()

        if name and email and program and year_level:
            Student.objects.create(
                name=name,
                email=email,
                program=program,
                year_level=year_level
            )
            return redirect('student_list')

    return render(request, 'registration/student_form.html')


@login_required
def student_edit(request, student_id):
    student = get_object_or_404(Student, id=student_id)

    if request.method == 'POST':
        student.name = request.POST.get('name', '').strip()
        student.email = request.POST.get('email', '').strip()
        student.program = request.POST.get('program', '').strip()
        student.year_level = request.POST.get('year_level', '').strip()
        student.save()

        return redirect('student_list')

    return render(
        request,
        'registration/student_form.html',
        {'student': student}
    )


@login_required
def student_delete(request, student_id):
    student = get_object_or_404(Student, id=student_id)

    if request.method == 'POST':
        student.delete()
        return redirect('student_list')

    return render(
        request,
        'registration/student_confirm_delete.html',
        {'student': student}
    )


@login_required
def student_api(request):
    students = Student.objects.all().order_by('name')

    data = [
        {
            'id': student.id,
            'name': student.name,
            'email': student.email,
            'program': student.program,
            'year_level': student.year_level,
        }
        for student in students
    ]

    return JsonResponse({
        'students': data,
        'count': len(data),
    })