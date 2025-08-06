# backend/apps/schools/tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models import User, Role # Import User and Role for creating test users
from .models import School

class SchoolAPITests(APITestCase):
    """
    Tests for the School API endpoints.
    """
    def setUp(self):
        """
        Set up test data and users before each test method.
        """
        # Create a test role (e.g., a generic role for authenticated users)
        self.role = Role.objects.create(name="Test Role", description="A generic role for testing.")

        # Create a regular authenticated user
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword',
            role=self.role # Assign the test role
        )
        # Create a super admin user
        self.super_admin = User.objects.create_superuser(
            username='superadmin',
            email='super@example.com',
            password='superpassword',
            is_superadmin=True # Mark as super admin
        )

        # Get JWT tokens for authentication
        # Authenticate regular user
        response = self.client.post(reverse('token_obtain_pair'), {'username': 'testuser', 'password': 'testpassword'}, format='json')
        self.access_token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

        # Authenticate super admin
        response_super = self.client.post(reverse('token_obtain_pair'), {'username': 'superadmin', 'password': 'superpassword'}, format='json')
        self.super_admin_access_token = response_super.data['access']


        # Define URLs for School API
        self.list_url = reverse('school-list') # Maps to /api/schools/
        self.detail_url = lambda pk: reverse('school-detail', kwargs={'pk': pk}) # Maps to /api/schools/{id}/

    def test_create_school_authenticated(self):
        """
        Ensure an authenticated user can create a new school.
        (Currently, any authenticated user can create, as per initial setup)
        """
        data = {'name': 'New Test School', 'subdomain': 'newtest'}
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(School.objects.count(), 1)
        self.assertEqual(School.objects.get().name, 'New Test School')

    def test_create_school_unauthenticated(self):
        """
        Ensure an unauthenticated user cannot create a new school.
        """
        self.client.credentials() # Clear credentials
        data = {'name': 'Unauthorized School', 'subdomain': 'unauth'}
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(School.objects.count(), 0)

    def test_list_schools_authenticated(self):
        """
        Ensure an authenticated user can list schools.
        """
        School.objects.create(name='School A', subdomain='schoola')
        School.objects.create(name='School B', subdomain='schoolb')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2) # Assuming pagination is enabled and returns 'results' key

    def test_retrieve_school_authenticated(self):
        """
        Ensure an authenticated user can retrieve a specific school.
        """
        school = School.objects.create(name='Single School', subdomain='singleschool')
        response = self.client.get(self.detail_url(school.pk))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Single School')

    def test_update_school_authenticated(self):
        """
        Ensure an authenticated user can update a school.
        """
        school = School.objects.create(name='School to Update', subdomain='toupdate')
        updated_data = {'name': 'Updated School Name', 'subdomain': 'updated'}
        response = self.client.patch(self.detail_url(school.pk), updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        school.refresh_from_db()
        self.assertEqual(school.name, 'Updated School Name')

    def test_delete_school_authenticated(self):
        """
        Ensure an authenticated user can delete a school.
        """
        school = School.objects.create(name='School to Delete', subdomain='todelete')
        response = self.client.delete(self.detail_url(school.pk))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(School.objects.count(), 0)

    def test_super_admin_access(self):
        """
        Ensure super admin can perform all actions.
        """
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.super_admin_access_token)

        # Create
        data = {'name': 'Super Admin School', 'subdomain': 'superadmin'}
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(School.objects.count(), 1)
        school = School.objects.get(name='Super Admin School')

        # List
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

        # Retrieve
        response = self.client.get(self.detail_url(school.pk))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Update
        updated_data = {'name': 'Super Admin Updated', 'subdomain': 'superupdated'}
        response = self.client.patch(self.detail_url(school.pk), updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        school.refresh_from_db()
        self.assertEqual(school.name, 'Super Admin Updated')

        # Delete
        response = self.client.delete(self.detail_url(school.pk))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(School.objects.count(), 0)
