#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tenant_core.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()


"""
=============================================================================
                           SCHOOL RESULTS SYSTEM API ENDPOINTS
=============================================================================

Base URL: http://localhost:8000 or http://0.0.0.0:8000
All API endpoints require authentication except for token endpoints.

=============================================================================
AUTHENTICATION ENDPOINTS
=============================================================================

POST /api/token/
    Description: Login endpoint - Get access and refresh tokens
    Body: {"username": "your_username", "password": "your_password"}
    Response: {"access": "access_token", "refresh": "refresh_token"}

POST /api/token/refresh/
    Description: Refresh access token using refresh token
    Body: {"refresh": "your_refresh_token"}
    Response: {"access": "new_access_token"}

=============================================================================
USER MANAGEMENT ENDPOINTS
=============================================================================

GET /api/users/
    Description: List all users (paginated)
    Authentication: Required
    Response: List of user objects with basic info

POST /api/users/
    Description: Create a new user
    Authentication: Required (Admin/Superadmin)
    Body: {"username": "string", "email": "email", "password": "string", 
           "first_name": "string", "last_name": "string", "school": "uuid", 
           "role": "uuid"}

GET /api/users/{id}/
    Description: Get specific user details
    Authentication: Required
    Response: Full user object

PUT /api/users/{id}/
    Description: Update user (full update)
    Authentication: Required (Admin/Superadmin or own profile)
    Body: Complete user object

PATCH /api/users/{id}/
    Description: Partial update user
    Authentication: Required (Admin/Superadmin or own profile)
    Body: Fields to update

DELETE /api/users/{id}/
    Description: Delete user
    Authentication: Required (Admin/Superadmin)

GET /api/users/me/
    Description: Get current authenticated user's profile
    Authentication: Required
    Response: Current user's profile data

=============================================================================
ROLE MANAGEMENT ENDPOINTS
=============================================================================

GET /api/users/roles/
    Description: List all available roles
    Authentication: Required
    Response: List of role objects

POST /api/users/roles/
    Description: Create a new role
    Authentication: Required (Superadmin)
    Body: {"name": "string", "description": "string"}

GET /api/users/roles/{id}/
    Description: Get specific role details
    Authentication: Required
    Response: Role object

PUT /api/users/roles/{id}/
    Description: Update role (full update)
    Authentication: Required (Superadmin)
    Body: Complete role object

PATCH /api/users/roles/{id}/
    Description: Partial update role
    Authentication: Required (Superadmin)
    Body: Fields to update

DELETE /api/users/roles/{id}/
    Description: Delete role
    Authentication: Required (Superadmin)

=============================================================================
SCHOOL MANAGEMENT ENDPOINTS
=============================================================================

GET /api/schools/
    Description: List all schools
    Authentication: Required (Superadmin)
    Response: List of school objects

POST /api/schools/
    Description: Create a new school
    Authentication: Required (Superadmin)
    Body: {"name": "string", "subdomain": "string"}

GET /api/schools/{id}/
    Description: Get specific school details
    Authentication: Required
    Response: School object

PUT /api/schools/{id}/
    Description: Update school (full update)
    Authentication: Required (Superadmin or School Admin)
    Body: Complete school object

PATCH /api/schools/{id}/
    Description: Partial update school
    Authentication: Required (Superadmin or School Admin)
    Body: Fields to update

DELETE /api/schools/{id}/
    Description: Delete school
    Authentication: Required (Superadmin)

=============================================================================
STUDENT MANAGEMENT ENDPOINTS
=============================================================================

GET /api/students/
    Description: List all students (filtered by user's school)
    Authentication: Required
    Response: List of student objects

POST /api/students/
    Description: Create a new student
    Authentication: Required (Admin/Teacher)
    Body: {"first_name": "string", "last_name": "string", "gender": "M/F/O",
           "date_of_birth": "YYYY-MM-DD", "school": "uuid"}

GET /api/students/{id}/
    Description: Get specific student details
    Authentication: Required
    Response: Student object

PUT /api/students/{id}/
    Description: Update student (full update)
    Authentication: Required (Admin/Teacher)
    Body: Complete student object

PATCH /api/students/{id}/
    Description: Partial update student
    Authentication: Required (Admin/Teacher)
    Body: Fields to update

DELETE /api/students/{id}/
    Description: Delete student
    Authentication: Required (Admin)

=============================================================================
ADMIN INTERFACE
=============================================================================

GET /admin/
    Description: Django Admin interface
    Authentication: Django admin credentials required
    Access: Web browser interface for data management

=============================================================================
TESTING ENDPOINTS
=============================================================================

Example API Test Commands (using curl):

1. Get Authentication Token:
   curl -X POST http://localhost:8000/api/token/ \
        -H "Content-Type: application/json" \
        -d '{"username": "superuser", "password": "your_password"}'

2. List Users (with token):
   curl -X GET http://localhost:8000/api/users/ \
        -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

3. Create Student:
   curl -X POST http://localhost:8000/api/students/ \
        -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"first_name": "John", "last_name": "Doe", "gender": "M"}'

=============================================================================
NOTES:
- All endpoints return JSON responses
- Use Bearer token authentication: "Authorization: Bearer YOUR_ACCESS_TOKEN"
- UUIDs are used for all primary keys
- Error responses include appropriate HTTP status codes and error messages
- Pagination is applied to list endpoints (default: 10 items per page)
=============================================================================
"""
