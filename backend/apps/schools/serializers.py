# backend/apps/schools/serializers.py
from rest_framework import serializers
from .models import School

class SchoolSerializer(serializers.ModelSerializer):
    """
    Serializer for the School model.
    Converts School model instances to JSON and vice-versa for API operations.
    """
    class Meta:
        model = School
        fields = '__all__' # Include all fields from the School model
        read_only_fields = ('id', 'created_at', 'updated_at') # Fields that cannot be modified via API POST/PUT
