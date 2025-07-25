from rest_framework import serializers
from .models import User, Role, UserRole

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name', 'description']

class UserRoleSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    class Meta:
        model = UserRole
        fields = ['id', 'role', 'assigned_by', 'assigned_at']

class UserSerializer(serializers.ModelSerializer):
    roles = RoleSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'roles']
