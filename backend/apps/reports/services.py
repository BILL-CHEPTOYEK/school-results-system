from .models import Report
from .utils import calculate_report_aggregates
from apps.results.models import Result, GradingScheme, Grade
from django.db.models import F

def generate_or_update_report(student, term, year):
    total_marks, average = calculate_report_aggregates(student, term, year)
    # Get grading scheme (assume one active per school/tenant)
    grading_scheme = GradingScheme.objects.filter(is_active=True).first()
    grade = None
    if grading_scheme:
        grade_obj = Grade.objects.filter(grading_scheme=grading_scheme, min_score__lte=average, max_score__gte=average).first()
        grade = grade_obj.grade if grade_obj else ''
    # Calculate position (rank by average in class/stream)
    # For now, position is set to 0; implement class/stream logic as needed
    position = 0
    report, created = Report.objects.update_or_create(
        student=student, term=term, year=year,
        defaults={
            'total_marks': total_marks,
            'average': average,
            'grade': grade,
            'position': position,
        }
    )
    return report
