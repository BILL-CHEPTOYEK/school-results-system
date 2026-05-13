# backend/apps/schools/models.py
import uuid
from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class School(models.Model):
    """
    Model representing a School in the system.
    Each school can have its own login credentials and manage their own data.
    """
    name = models.CharField(max_length=200, help_text="Name of the school")
    email = models.EmailField(unique=True, help_text="School's email address for login")
    password = models.CharField(max_length=128, help_text="Hashed password for school login")
    address = models.TextField(blank=True, null=True, help_text="School's physical address")
    phone = models.CharField(max_length=20, blank=True, null=True, help_text="School's contact phone number")
    is_active = models.BooleanField(default=True, help_text="Whether the school account is active")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Schools"

    def __str__(self):
        return self.name

    def set_password(self, raw_password):
        """Hash and set the password."""
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        """Check if the provided password matches the stored hash."""
        return check_password(raw_password, self.password)