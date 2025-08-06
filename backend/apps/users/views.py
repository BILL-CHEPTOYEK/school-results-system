# backend/apps/users/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny # Import permissions
from rest_framework.decorators import action # For custom actions on ViewSets
from .models import User, Role
from .serializers import UserSerializer, RoleSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Users to be viewed, created, updated, or deleted.
    - Allows unauthenticated users to create new users (e.g., for registration).
    - Requires authentication for all other actions (list, retrieve, update, delete).
    """
    queryset = User.objects.all() # Retrieve all User objects
    serializer_class = UserSerializer # Use the UserSerializer for data conversion

    def get_permissions(self):
        """
        Custom permission logic for UserViewSet actions.
        """
        if self.action == 'create':
            return [AllowAny()] # Allow anyone (authenticated or not) to create a user
        return [IsAuthenticated()] # Require authentication for all other actions

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """
        Custom endpoint to retrieve details of the currently authenticated user.
        Accessible at /api/users/me/
        """
        # This check is mostly for clarity; IsAuthenticated permission_classes already handles it.
        if request.user.is_authenticated:
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        return Response({"detail": "Not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

class RoleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Roles to be viewed, created, updated, or deleted.
    Initially, any authenticated user can access this.
    """
    queryset = Role.objects.all() # Retrieve all Role objects
    serializer_class = RoleSerializer # Use the RoleSerializer for data conversion
    permission_classes = [IsAuthenticated] # Require authentication for all actions
