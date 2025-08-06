# backend/apps/schools/models.py
import uuid
from django.db import models

class School(models.Model):
    """
    Represents a single school (tenant) in the SaaS system.
    All school-specific data will be linked to an instance of this model.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False,
                          help_text="Unique identifier for the school.")
    name = models.CharField(max_length=255, unique=True,
                            help_text="The official name of the school.")
    subdomain = models.CharField(max_length=100, unique=True, null=True, blank=True,
                                 help_text="Optional subdomain for the school (e.g., 'springfield' for springfield.yoursaas.com).")
    created_at = models.DateTimeField(auto_now_add=True,
                                      help_text="Timestamp when the school record was created.")
    updated_at = models.DateTimeField(auto_now=True,
                                      help_text="Timestamp when the school record was last updated.")

    class Meta:
        verbose_name_plural = "Schools" # Correct plural name for Django Admin

    def __str__(self):
        return self.name