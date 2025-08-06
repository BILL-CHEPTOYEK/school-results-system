# backend/apps/schools/admin.py
from django.contrib import admin
from .models import School

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    """
    Admin configuration for the School model.
    Allows easy management of school instances in the Django admin.
    """
    list_display = ('name', 'subdomain', 'created_at', 'updated_at') # Fields to display in the list view
    search_fields = ('name', 'subdomain') # Fields to enable search functionality
    list_filter = ('created_at',) # Fields to enable filtering in the sidebar
    ordering = ('name',) # Default ordering