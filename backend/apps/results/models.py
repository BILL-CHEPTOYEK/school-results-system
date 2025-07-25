from django.db import models
from apps.students.models import Student
from django.conf import settings

class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    # Link to tenant/school if needed
    # school = models.ForeignKey('core.School', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class AssessmentType(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    weight = models.FloatField(default=1.0, help_text="Weight for aggregation (e.g., 0.4 for 40%)")
    is_active = models.BooleanField(default=True)
    # school = models.ForeignKey('core.School', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Term(models.Model):
    name = models.CharField(max_length=20)  # e.g., Term 1, Term 2
    year = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    # school = models.ForeignKey('core.School', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} {self.year}"

class Result(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    assessment_type = models.ForeignKey(AssessmentType, on_delete=models.CASCADE)
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    score = models.DecimalField(max_digits=6, decimal_places=2)
    date_recorded = models.DateTimeField(auto_now_add=True)
    comments = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('student', 'subject', 'assessment_type', 'term')

    def __str__(self):
        return f"{self.student} - {self.subject} - {self.assessment_type} - {self.term}"

class GradingScheme(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    # school = models.ForeignKey('core.School', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Grade(models.Model):
    grading_scheme = models.ForeignKey(GradingScheme, on_delete=models.CASCADE, related_name='grades')
    min_score = models.DecimalField(max_digits=5, decimal_places=2)
    max_score = models.DecimalField(max_digits=5, decimal_places=2)
    grade = models.CharField(max_length=10)
    remark = models.CharField(max_length=100, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-min_score']

    def __str__(self):
        return f"{self.grade} ({self.min_score}-{self.max_score})"
