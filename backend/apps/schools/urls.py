# backend/apps/schools/urls.py
from rest_framework.routers import DefaultRouter
from .views import SchoolViewSet

# Create a router instance for the SchoolViewSet
router = DefaultRouter()
router.register(r'', SchoolViewSet, basename='school')

# The router generates a list of URL patterns, which we then expose.
urlpatterns = router.urls
