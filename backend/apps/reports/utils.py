from apps.results.models import Result
from decimal import Decimal

def calculate_report_aggregates(student, term, year):
    results = Result.objects.filter(student=student, term=term, term__year=year)
    total_marks = sum([r.score for r in results])
    count = results.count()
    average = (Decimal(total_marks) / count) if count else Decimal('0.00')
    return total_marks, average
