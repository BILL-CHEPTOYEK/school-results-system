# backend/apps/users/serializers.py
from rest_framework import serializers
from .models import User, Role
# Import the SchoolSerializer from the schools app to nest school details in User responses
from apps.schools.serializers import SchoolSerializer
from apps.schools.models import School

class RoleSerializer(serializers.ModelSerializer):
    """
    Serializer for the Role model.
    Converts Role model instances to JSON and vice-versa for API operations.
    """
    class Meta:
        model = Role
        fields = '__all__' # Include all fields from the Role model
        read_only_fields = ('id',) # ID is automatically generated and should not be set via API

# backend/apps/users/serializers.py (continued for UserSerializer)
class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the custom User model.
    Handles serialization/deserialization of user data, including nested school and role details.
    """
    # Nested serializer to display full school details when fetching a user.
    # 'read_only=True' means this field is for output only, not for input during creation/update.
    school = SchoolSerializer(read_only=True)
    # Write-only field to allow setting the school by its ID during user creation/update.
    # 'source='school'' maps this serializer field to the 'school' ForeignKey on the User model.
    # 'queryset=School.objects.all()' ensures validation against existing School IDs.
    # 'allow_null=True' and 'required=False' allow users to be created/updated without a school initially.
    school_id = serializers.PrimaryKeyRelatedField(
        queryset=School.objects.all(), source='school', write_only=True, allow_null=True, required=False
    )

    # Nested serializer to display full role details when fetching a user.
    role = RoleSerializer(read_only=True)
    # Write-only field to allow setting the role by its ID during user creation/update.
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), source='role', write_only=True, allow_null=True, required=False
    )

    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name',
            'is_staff', 'is_active', 'is_superadmin',
            'school', 'school_id', 'role', 'role_id', # Include both nested objects and their ID fields
            'password' # Include password for creation/update (write-only)
        )
        read_only_fields = ('id',) # 'id' is generated automatically
        extra_kwargs = {
            'password': {'write_only': True, 'required': False} # Password should only be written, not read,
                                                                # and it's not required for updates if not changing password.
        }

    def create(self, validated_data):
        """
        Custom create method to handle setting the user's password securely.
        Django's default create doesn't hash the password automatically for custom User models.
        """
        password = validated_data.pop('password', None) # Extract password before creating user
        user = User.objects.create(**validated_data) # Create user with remaining data
        if password:
            user.set_password(password) # Hash the password
            user.save() # Save the user with the hashed password
        return user

    def update(self, instance, validated_data):
        """
        Custom update method to handle password changes securely.
        """
        password = validated_data.pop('password', None) # Extract password if present
        if password:
            instance.set_password(password) # Hash the new password
        # Call the parent update method to handle other fields
        return super().update(instance, validated_data)
