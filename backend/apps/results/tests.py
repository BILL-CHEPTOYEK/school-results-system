from django.test import TestCase
from .models import Subject, AssessmentType, Term, Result
from apps.students.models import Student

class ResultsModelTest(TestCase):
    def test_create_subject(self):
        subject = Subject.objects.create(name='Mathematics')
        self.assertEqual(subject.name, 'Mathematics')
