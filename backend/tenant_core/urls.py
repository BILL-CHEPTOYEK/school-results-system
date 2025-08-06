# backend/tenant_core/urls.py
from django.contrib import admin
from django.urls import path, include # 'include' is used to pull in URLs from other apps
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # Endpoint to get access and refresh tokens (username/password)
    TokenRefreshView,     # Endpoint to refresh an expired access token using a refresh token
)

urlpatterns = [
    # Django Admin interface URL
    path('admin/', admin.site.urls),

    # JWT Authentication Endpoints
    # Users will POST their username/password here to get access and refresh tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Users will POST their refresh token here to get a new access token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Include URLs from your custom Django apps
    # All API endpoints for users will start with /api/users/
    path('api/users/', include('apps.users.urls')),
    # All API endpoints for schools will start with /api/schools/
    path('api/schools/', include('apps.schools.urls')),
    # Add other app URLs here as you create them (e.g., path('api/students/', include('apps.students.urls')))
]
