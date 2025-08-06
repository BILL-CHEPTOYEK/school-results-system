# backend/apps/students/serializers.py
from rest_framework import serializers
from .models import Student
from apps.schools.models import School  # Import School model for queryset
from apps.schools.serializers import SchoolSerializer # Import SchoolSerializer to nest school details

class StudentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Student model.
    Converts Student model instances to JSON and vice-versa for API operations.
    """
    # Nested serializer to display full school details when fetching a student
    # 'read_only=True' means this field is for output only, not for input
    school = SchoolSerializer(read_only=True)
    # Write-only field to allow setting the school by its ID during student creation/update
    # This is important for linking students to a specific school via API
    school_id = serializers.PrimaryKeyRelatedField(
        queryset=School.objects.all(), source='school', write_only=True
    )

    class Meta:
        model = Student
        fields = '__all__' # Include all fields from the Student model
        read_only_fields = ('id', 'admission_date') # Fields that cannot be modified via API POST/PUT
