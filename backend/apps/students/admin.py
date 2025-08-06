# backend/apps/students/admin.py
from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Student model.
    Allows easy management of student records in the Django admin.
    """
    list_display = ('first_name', 'last_name', 'school', 'gender', 'date_of_birth', 'admission_date')
    list_filter = ('school', 'gender', 'admission_date') # Filter by school, gender, admission date
    search_fields = ('first_name', 'last_name', 'school__name') # Search by student name and school name
    ordering = ('school__name', 'last_name', 'first_name') # Order by school, then last name, then first name
    raw_id_fields = ('school',) # Use a raw ID input for school for better performance with many schools
