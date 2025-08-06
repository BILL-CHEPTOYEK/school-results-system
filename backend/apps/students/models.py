# backend/apps/students/models.py
import uuid
from django.db import models
from apps.schools.models import School # Import the School model for multi-tenancy

class Student(models.Model):
    """
    Represents a student record within a specific school.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False,
                          help_text="Unique identifier for the student.")
    # Foreign Key to the School model: links a student to their specific school (tenant).
    school = models.ForeignKey(School, on_delete=models.CASCADE,
                               help_text="The school this student belongs to.")
    first_name = models.CharField(max_length=100,
                                  help_text="First name of the student.")
    last_name = models.CharField(max_length=100,
                                 help_text="Last name of the student.")
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')],
                              help_text="Gender of the student.")
    date_of_birth = models.DateField(null=True, blank=True,
                                     help_text="Student's date of birth.")
    admission_date = models.DateField(auto_now_add=True,
                                      help_text="Date when the student was admitted to the school.")
    # Add other relevant student fields here as needed (e.g., current_class, stream, parent_contact_info)
    # For example:
    # current_class = models.CharField(max_length=50, blank=True, null=True)
    # stream = models.CharField(max_length=50, blank=True, null=True)
    # parent_contact_number = models.CharField(max_length=20, blank=True, null=True)


    class Meta:
        # Ensures that a combination of first name, last name, and date of birth
        # is unique *within each school*. This helps prevent duplicate student entries
        # for the same school.
        unique_together = ('school', 'first_name', 'last_name', 'date_of_birth')
        verbose_name_plural = "Students" # Correct plural name for Django Admin

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.school.name})"
