# backend/apps/users/models.py
import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
# Import the School model from the schools app
from apps.schools.models import School

class Role(models.Model):
    """
    Defines dynamic roles within the system (e.g., 'School Admin', 'Teacher', 'Student').
    Permissions for these roles will be managed dynamically via the frontend settings.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False,
                          help_text="Unique identifier for the role.")
    name = models.CharField(max_length=100, unique=True,
                            help_text="The name of the role (e.g., 'School Admin', 'Teacher', 'Student').")
    description = models.TextField(blank=True,
                                   help_text="A brief description of what this role entails.")

    class Meta:
        verbose_name_plural = "Roles" 

    def __str__(self):
        return self.name

class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    Includes fields to link users to their specific school and role,
    and a flag for global super administrators.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False,
                          help_text="Unique identifier for the user.")
    # Foreign Key to the School model: links a user to their specific school.
    # SET_NULL is used so if a school is deleted, users are not deleted but become unassigned.
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True, blank=True,
                               help_text="The school this user belongs to. Null for Super Admins or unassigned users.")
    # Foreign Key to the Role model: defines the user's role within their school context.
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True,
                             help_text="The role of the user within their school (e.g., Teacher, Student, School Admin).")
    # Boolean flag to identify global super administrators.
    # Super admins have access across all schools.
    is_superadmin = models.BooleanField(default=False,
                                        help_text="Designates whether this user has global super admin privileges across all schools.")

    # You can add other custom fields here if needed, like phone_number, address, etc.

    class Meta:
        # AbstractUser already enforces global uniqueness for 'username'.
        pass

    