# backend/apps/schools/serializers.py
from rest_framework import serializers
from .models import School

class SchoolSerializer(serializers.ModelSerializer):
    """
    Serializer for the School model.
    Converts School model instances to JSON and vice-versa for API operations.
    """
    password = serializers.CharField(write_only=True, min_length=6,
                                   help_text="Password for school login (minimum 6 characters)")
    
    class Meta:
        model = School
        fields = ['id', 'name', 'email', 'password', 'address', 'phone', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ('id', 'created_at', 'updated_at')
        extra_kwargs = {
            'password': {'write_only': True},  # Never return password in API response
        }

    def create(self, validated_data):
        """Create a new school with hashed password."""
        password = validated_data.pop('password')
        school = School(**validated_data)
        school.set_password(password)  # Hash the password
        school.save()
        return school

    def update(self, instance, validated_data):
        """Update school instance, handling password hashing if provided."""
        password = validated_data.pop('password', None)
        
        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Update password if provided
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance
