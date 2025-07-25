from django.test import TestCase
from .models import Student

class StudentModelTest(TestCase):
    def test_create_student(self):
        student = Student.objects.create(name='Test Student', gender='M', student_class='S1')
        self.assertEqual(student.name, 'Test Student')
