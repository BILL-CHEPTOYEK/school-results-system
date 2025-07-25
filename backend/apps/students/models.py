from django.db import models

class Student(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    student_class = models.CharField(max_length=50)
    stream = models.CharField(max_length=50, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    admission_number = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.admission_number})"
