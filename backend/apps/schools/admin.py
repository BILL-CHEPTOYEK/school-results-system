# backend/apps/schools/admin.py
from django.contrib import admin
from .models import School

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    """
    Admin configuration for the School model.
    Allows easy management of school instances in the Django admin.
    """
    list_display = ('name', 'email', 'is_active', 'created_at', 'updated_at')
    search_fields = ('name', 'email')
    list_filter = ('is_active', 'created_at')
    ordering = ('name',)
    readonly_fields = ('id', 'created_at', 'updated_at')
    exclude = ('password',)  # Don't show password field in admin (for security)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'email', 'is_active')
        }),
        ('Contact Details', {
            'fields': ('address', 'phone')
        }),
        ('System Information', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )