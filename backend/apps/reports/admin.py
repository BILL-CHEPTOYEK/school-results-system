from django.contrib import admin
from .models import Report

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('student', 'term', 'year', 'total_marks', 'average', 'grade', 'position', 'date_generated')
    search_fields = ('student__name', 'term__name', 'year', 'grade')
    list_filter = ('term', 'year', 'grade')
