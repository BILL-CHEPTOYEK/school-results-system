from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'gender', 'student_class', 'stream', 'date_of_birth', 'admission_number', 'created_at', 'updated_at']
