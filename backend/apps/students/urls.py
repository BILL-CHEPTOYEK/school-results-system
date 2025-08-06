# backend/apps/students/urls.py
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet

# Create a router instance for the StudentViewSet
router = DefaultRouter()
# Register the StudentViewSet with the router.
# This will automatically generate URLs like:
# - /api/students/ (GET for list, POST for create)
# - /api/students/{id}/ (GET for retrieve, PUT/PATCH for update, DELETE for destroy)
router.register(r'', StudentViewSet, basename='student')

# The router generates a list of URL patterns, which we then expose.
urlpatterns = router.urls
