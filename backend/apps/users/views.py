from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User, Role, UserRole
from .serializers import UserSerializer, RoleSerializer, UserRoleSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['post'])
    def assign_role(self, request, pk=None):
        user = self.get_object()
        role_id = request.data.get('role_id')
        assigned_by = request.user if request.user.is_authenticated else None
        try:
            role = Role.objects.get(id=role_id)
            UserRole.objects.create(user=user, role=role, assigned_by=assigned_by)
            return Response({'status': 'role assigned'})
        except Role.DoesNotExist:
            return Response({'error': 'Role not found'}, status=status.HTTP_400_BAD_REQUEST)

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer