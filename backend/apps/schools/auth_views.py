# backend/apps/schools/auth_views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import School

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def school_login(request):
    """
    Authenticate a school using email and password.
    Returns JWT tokens for the school.
    """
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response(
            {'error': 'Email and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        school = School.objects.get(email=email, is_active=True)
        
        if school.check_password(password):
            # Create JWT tokens
            refresh = RefreshToken()
            refresh['school_id'] = str(school.id)
            refresh['school_name'] = school.name
            refresh['school_email'] = school.email
            
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'school': {
                    'id': school.id,
                    'name': school.name,
                    'email': school.email,
                    'is_active': school.is_active
                }
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

@api_view(['POST'])
@permission_classes([AllowAny])
def school_register(request):
    """
    Register a new school.
    """
    from .serializers import SchoolSerializer
    
    serializer = SchoolSerializer(data=request.data)
    if serializer.is_valid():
        school = serializer.save()
        
        # Auto-login after registration
        refresh = RefreshToken()
        refresh['school_id'] = str(school.id)
        refresh['school_name'] = school.name
        refresh['school_email'] = school.email
        
        return Response({
            'message': 'School registered successfully',
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'school': {
                'id': school.id,
                'name': school.name,
                'email': school.email,
                'is_active': school.is_active
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
