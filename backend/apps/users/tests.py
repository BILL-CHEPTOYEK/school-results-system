from django.test import TestCase
from .models import User

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(email='test@example.com', username='testuser')
        self.assertEqual(user.email, 'test@example.com')
