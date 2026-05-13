# backend/apps/schools/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import SchoolViewSet
from .auth_views import school_login, school_register

# Create a router instance for the SchoolViewSet
router = DefaultRouter()
router.register(r'', SchoolViewSet, basename='school')

# Combine router URLs with custom authentication URLs
urlpatterns = [
    path('auth/login/', school_login, name='school-login'),
    path('auth/register/', school_register, name='school-register'),
] + router.urls
