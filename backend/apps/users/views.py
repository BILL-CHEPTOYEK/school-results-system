from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User, Role, UserRole
from .serializers import UserSerializer, RoleSerializer, UserRoleSerializer
from rest_framework import generics, permissions
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView

User = get_user_model()

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

class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=400)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=404)
        token = default_token_generator.make_token(user)
        uid = user.pk
        # In production, send email with link containing uid and token
        # For now, just return them
        return Response({'uid': uid, 'token': token})

class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        if not (uid and token and new_password):
            return Response({'error': 'uid, token, and new_password are required.'}, status=400)
        try:
            user = User.objects.get(pk=uid)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=404)
        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid token.'}, status=400)
        user.set_password(new_password)
        user.save()
        return Response({'success': 'Password has been reset.'})

class PasswordChangeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        if not (old_password and new_password):
            return Response({'error': 'old_password and new_password are required.'}, status=400)
        if not user.check_password(old_password):
            return Response({'error': 'Old password is incorrect.'}, status=400)
        user.set_password(new_password)
        user.save()
        return Response({'success': 'Password changed successfully.'})