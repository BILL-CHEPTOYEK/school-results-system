# backend/apps/schools/views.py
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import School
from .serializers import SchoolSerializer

class SchoolViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Schools to be viewed or edited.
    - POST (create): Open to all (school registration)
    - GET, PUT, PATCH, DELETE: Require authentication
    """
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['create', 'list']:
            # Allow school creation and listing without authentication
            # (list is for admin management, create is for registration)
            permission_classes = [AllowAny]
        else:
            # Require authentication for update, delete operations
            permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        """
        Custom login endpoint for schools using email and password.
        """
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response(
                {'error': 'Email and password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            school = School.objects.get(email=email)
            if school.check_password(password):
                if not school.is_active:
                    return Response(
                        {'error': 'School account is suspended'}, 
                        status=status.HTTP_403_FORBIDDEN
                    )
                
                # Generate JWT tokens (if you want to use JWT for schools)
                # For now, just return school data
                serializer = self.get_serializer(school)
                return Response({
                    'message': 'Login successful',
                    'school': serializer.data
                }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'Invalid credentials'}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
        except School.DoesNotExist:
            return Response(
                {'error': 'Invalid credentials'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
