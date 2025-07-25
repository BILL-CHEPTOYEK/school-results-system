from django.db import models
from apps.students.models import Student
from apps.results.models import Term

class Report(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    year = models.IntegerField()
    total_marks = models.DecimalField(max_digits=8, decimal_places=2)
    average = models.DecimalField(max_digits=6, decimal_places=2)
    grade = models.CharField(max_length=10)
    position = models.PositiveIntegerField()
    comments = models.TextField(blank=True, null=True)
    date_generated = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'term', 'year')

    def __str__(self):
        return f"{self.student} - {self.term} - {self.year}"

# Optionally, a ReportTemplate model can be added for custom layouts per school
