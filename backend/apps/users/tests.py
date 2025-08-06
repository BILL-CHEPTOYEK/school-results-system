# backend/apps/users/tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.schools.models import School # Needed to create a school for user assignment
from .models import User, Role

class UserAPITests(APITestCase):
    """
    Tests for the User API endpoints.
    """
    def setUp(self):
        """
        Set up test data and users before each test method.
        """
        # Create a test school
        self.school = School.objects.create(name='Test School', subdomain='testschool')

        # Create a test role
        self.role = Role.objects.create(name='Test Role', description='A generic role for testing users.')

        # Create a regular user (will be used for authenticated requests)
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpassword123',
            'first_name': 'Test',
            'last_name': 'User',
            'school_id': str(self.school.id), # Assign to the test school
            'role_id': str(self.role.id)      # Assign the test role
        }
        self.user = User.objects.create_user(**self.user_data)

        # Create a super admin user
        self.super_admin_data = {
            'username': 'superadmin',
            'email': 'super@example.com',
            'password': 'superpassword123',
            'is_superadmin': True
        }
        self.super_admin = User.objects.create_superuser(**self.super_admin_data)


        # Get JWT tokens for authentication
        # Authenticate regular user
        response = self.client.post(reverse('token_obtain_pair'), {'username': 'testuser', 'password': 'testpassword123'}, format='json')
        self.access_token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

        # Authenticate super admin
        response_super = self.client.post(reverse('token_obtain_pair'), {'username': 'superadmin', 'password': 'superpassword123'}, format='json')
        self.super_admin_access_token = response_super.data['access']


        # Define URLs for User API
        self.list_create_url = reverse('user-list') # Maps to /api/users/
        self.detail_url = lambda pk: reverse('user-detail', kwargs={'pk': pk}) # Maps to /api/users/{id}/
        self.me_url = reverse('user-me') # Maps to /api/users/me/

    def test_create_user_unauthenticated(self):
        """
        Ensure an unauthenticated user can create a new user (registration scenario).
        """
        self.client.credentials() # Clear credentials to simulate unauthenticated request
        new_user_data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'newpassword',
            'school_id': str(self.school.id),
            'role_id': str(self.role.id)
        }
        response = self.client.post(self.list_create_url, new_user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())
        # Verify password is hashed
        self.assertFalse(User.objects.get(username='newuser').check_password('newpassword'))

    def test_list_users_authenticated(self):
        """
        Ensure an authenticated user can list all users.
        (Currently, any authenticated user can list all, no school filtering yet)
        """
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should see at least the testuser and superadmin we created in setUp
        self.assertGreaterEqual(len(response.data['results']), 2)

    def test_list_users_unauthenticated(self):
        """
        Ensure an unauthenticated user cannot list users.
        """
        self.client.credentials() # Clear credentials
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_user_authenticated(self):
        """
        Ensure an authenticated user can retrieve a specific user.
        """
        response = self.client.get(self.detail_url(self.user.pk))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)
        self.assertEqual(response.data['school']['id'], str(self.school.id)) # Check nested school
        self.assertEqual(response.data['role']['id'], str(self.role.id))     # Check nested role

    def test_retrieve_me_endpoint(self):
        """
        Ensure the /api/users/me/ endpoint returns the authenticated user's details.
        """
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)
        self.assertEqual(response.data['id'], str(self.user.id))

    def test_update_user_authenticated(self):
        """
        Ensure an authenticated user can update a user.
        (Currently, any authenticated user can update any user)
        """
        updated_data = {'first_name': 'Updated', 'email': 'updated@example.com'}
        response = self.client.patch(self.detail_url(self.user.pk), updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, 'Updated')
        self.assertEqual(self.user.email, 'updated@example.com')

    def test_update_user_password(self):
        """
        Ensure an authenticated user can update their password.
        """
        new_password = 'new_secure_password'
        update_data = {'password': new_password}
        response = self.client.patch(self.detail_url(self.user.pk), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(new_password))

    def test_delete_user_authenticated(self):
        """
        Ensure an authenticated user can delete a user.
        (Currently, any authenticated user can delete any user)
        """
        user_to_delete = User.objects.create_user(username='todelete', email='del@example.com', password='delpass')
        response = self.client.delete(self.detail_url(user_to_delete.pk))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(username='todelete').exists())

class RoleAPITests(APITestCase):
    """
    Tests for the Role API endpoints.
    """
    def setUp(self):
        """
        Set up test users for Role API tests.
        """
        self.user = User.objects.create_user(username='roleuser', email='role@example.com', password='rolepassword')
        response = self.client.post(reverse('token_obtain_pair'), {'username': 'roleuser', 'password': 'rolepassword'}, format='json')
        self.access_token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

        self.list_url = reverse('role-list') # Maps to /api/users/roles/
        self.detail_url = lambda pk: reverse('role-detail', kwargs={'pk': pk})

    def test_create_role_authenticated(self):
        """
        Ensure an authenticated user can create a new role.
        """
        data = {'name': 'New Role', 'description': 'Description for new role'}
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Role.objects.count(), 1)
        self.assertEqual(Role.objects.get().name, 'New Role')

    def test_list_roles_authenticated(self):
        """
        Ensure an authenticated user can list roles.
        """
        Role.objects.create(name='Role A')
        Role.objects.create(name='Role B')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)

    def test_retrieve_role_authenticated(self):
        """
        Ensure an authenticated user can retrieve a specific role.
        """
        role = Role.objects.create(name='Single Role')
        response = self.client.get(self.detail_url(role.pk))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Single Role')

    def test_update_role_authenticated(self):
        """
        Ensure an authenticated user can update a role.
        """
        role = Role.objects.create(name='Role to Update')
        updated_data = {'name': 'Updated Role Name'}
        response = self.client.patch(self.detail_url(role.pk), updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        role.refresh_from_db()
        self.assertEqual(role.name, 'Updated Role Name')

    def test_delete_role_authenticated(self):
        """
        Ensure an authenticated user can delete a role.
        """
        role = Role.objects.create(name='Role to Delete')
        response = self.client.delete(self.detail_url(role.pk))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Role.objects.count(), 0)

    def test_role_api_unauthenticated_access(self):
        """
        Ensure unauthenticated users cannot access Role API endpoints.
        """
        self.client.credentials() # Clear credentials

        # Test list
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Test create
        data = {'name': 'Unauthorized Role'}
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Test retrieve (create one first for testing)
        role = Role.objects.create(name='Temp Role')
        response = self.client.get(self.detail_url(role.pk))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Test update
        response = self.client.patch(self.detail_url(role.pk), {'name': 'New Name'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Test delete
        response = self.client.delete(self.detail_url(role.pk))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
