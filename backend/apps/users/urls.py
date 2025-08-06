# backend/apps/users/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include # 'include' is needed if you want to include other URL patterns later
from .views import UserViewSet, RoleViewSet

# Create a router instance for user-related viewsets
router = DefaultRouter()

# Register the UserViewSet.
# This will generate URLs like:
# - /api/users/ (GET for list, POST for create)
# - /api/users/{id}/ (GET for retrieve, PUT/PATCH for update, DELETE for destroy)
# - /api/users/me/ (GET for the custom 'me' action)
router.register(r'', UserViewSet, basename='user')

# Register the RoleViewSet.
# This will generate URLs like:
# - /api/users/roles/ (GET for list, POST for create)
# - /api/users/roles/{id}/ (GET for retrieve, PUT/PATCH for update, DELETE for destroy)
router.register(r'roles', RoleViewSet, basename='role')

# The router generates a list of URL patterns, which we then expose.
urlpatterns = router.urls
