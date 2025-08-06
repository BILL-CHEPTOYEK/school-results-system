# backend/apps/students/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated # Import IsAuthenticated permission
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Students to be viewed or edited.
    Initially, any authenticated user can access this.
    """
    queryset = Student.objects.all() # Retrieve all Student objects
    serializer_class = StudentSerializer # Use the StudentSerializer for data conversion
    permission_classes = [IsAuthenticated] # Require authentication for all actions on this viewset

    # IMPORTANT: we are NOT implementing school_id filtering here yet.
    # This means any authenticated user can see/manage all students for now.
    # We will add filtering based on request.user.school later in the process.

    # When a student is created via the API, automatically assign the school
    # based on the 'school_id' provided in the request or the authenticated user's school.
    # For now, we'll assume the 'school_id' is provided in the request body.
    # When we add school-based filtering, we'll modify this to use request.user.school.
    def perform_create(self, serializer):
        # If school_id is provided in the request, use it.
        # Otherwise, if the user is associated with a school, use that.
        # For initial setup, we expect school_id to be passed explicitly.
        # Example: serializer.save(school=self.request.user.school) would be used later
        serializer.save()
