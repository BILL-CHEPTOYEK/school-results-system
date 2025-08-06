# backend/apps/schools/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated # Import IsAuthenticated permission
from .models import School
from .serializers import SchoolSerializer

class SchoolViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Schools to be viewed or edited.
    Initially, any authenticated user can access this.
    """
    queryset = School.objects.all() # Retrieve all School objects
    serializer_class = SchoolSerializer # Use the SchoolSerializer for data conversion
    permission_classes = [IsAuthenticated] # Require authentication for all actions on this viewset

    # not implemented school filtering yet.
    # This means any authenticated user can see/manage all schools for now.
    # We will add filtering based on request.user.school later in the process.
