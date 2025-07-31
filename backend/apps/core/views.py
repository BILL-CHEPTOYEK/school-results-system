from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.contrib.auth import get_user_model
from .models import Client
from .serializers import TenantCreateSerializer, ClientListSerializer
from django_tenants.utils import schema_context
from django.core.mail import send_mail

from django_tenants.utils import schema_context, get_public_schema_name
from django.db import connection

class PublicSuperAdminCreateView(APIView):
    """
    API endpoint to create a global superadmin user in the public schema.
    Only allowed from the public schema. Should be removed or protected after initial setup.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        # Only allow from public schema
        if connection.schema_name != get_public_schema_name():
            return Response({'detail': 'Superadmin can only be created from the public schema.'}, status=403)
        data = request.data
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                return Response({field: 'This field is required.'}, status=400)
        with schema_context(get_public_schema_name()):
            if User.objects.filter(username=data['username']).exists():
                return Response({'detail': 'User already exists.'}, status=400)
            user = User.objects.create_superuser(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                first_name=data.get('first_name', ''),
                last_name=data.get('last_name', ''),
            )
            if hasattr(user, 'phone') and data.get('phone'):
                user.phone = data['phone']
                user.save()
        return Response({'detail': 'Superadmin created in public schema.'}, status=201)

User = get_user_model()

class TenantListCreateView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        tenants = Client.objects.all()
        serializer = ClientListSerializer(tenants, many=True)
        return Response(serializer.data)

    @transaction.atomic
    def post(self, request):
        serializer = TenantCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        data = serializer.validated_data
        # Only allow tenant creation from public schema
        if connection.schema_name != get_public_schema_name():
            return Response({'detail': 'Tenant creation only allowed from public schema.'}, status=403)
        # Always create tenant in public schema
        with schema_context(get_public_schema_name()):
            tenant = Client(
                name=data['school_name'],
                school_type=data['school_type'],
                school_address=data['school_address'],
                school_phone=data['school_phone'],
                schema_name=data['school_name'].replace(' ', '').lower(),
            )
            tenant.save()
            from .models import Domain
            Domain.objects.create(
                domain=f"{data['school_name'].replace(' ', '').lower()}.localhost",
                tenant=tenant,
                is_primary=True
            )
        # Create admin user in new tenant schema
        with schema_context(tenant.schema_name):
            admin = User.objects.create_superuser(
                username=data['admin_email'],
                email=data['admin_email'],
                password=data['admin_password'],
                first_name=data['admin_name'],
            )
            if hasattr(admin, 'phone'):
                admin.phone = data.get('admin_phone', '')
                admin.save()
        send_mail(
            subject='New School Registered',
            message=f"School: {tenant.name}\nAdmin: {data['admin_email']}",
            from_email=None,
            recipient_list=['superadmin@example.com'],
            fail_silently=True,
        )
        return Response({'detail': 'Tenant and admin created.'}, status=status.HTTP_201_CREATED)
