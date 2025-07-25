from django.test import TestCase
from apps.students.models import Student
from apps.results.models import Term, Subject, AssessmentType, Result, GradingScheme, Grade
from .models import Report
from .services import generate_or_update_report

class ReportGenerationTest(TestCase):
    def setUp(self):
        # Create test data for student, term, grading scheme, etc.
        self.student = Student.objects.create(name='Test Student', gender='M', student_class='S1')
        self.term = Term.objects.create(name='Term 1', year=2025, start_date='2025-01-01', end_date='2025-04-01')
        self.subject = Subject.objects.create(name='Mathematics')
        self.assessment_type = AssessmentType.objects.create(name='Exam')
        self.grading_scheme = GradingScheme.objects.create(name='Default', is_active=True)
        Grade.objects.create(grading_scheme=self.grading_scheme, min_score=80, max_score=100, grade='A')
        Grade.objects.create(grading_scheme=self.grading_scheme, min_score=60, max_score=79, grade='B')
        Result.objects.create(student=self.student, subject=self.subject, assessment_type=self.assessment_type, term=self.term, teacher=None, score=85)

    def test_generate_report(self):
        report = generate_or_update_report(self.student, self.term, 2025)
        self.assertEqual(report.total_marks, 85)
        self.assertEqual(report.average, 85)
        self.assertEqual(report.grade, 'A')
