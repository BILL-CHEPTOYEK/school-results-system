from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from django_tenants.utils import get_public_schema_name
from django.db import connection

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        is_superuser = getattr(user, 'is_superuser', False)
        # If user is in public schema, no tenant_domain
        if connection.schema_name == get_public_schema_name():
            tenant_domain = None
        else:
            from apps.core.models import Domain
            domain_obj = Domain.objects.filter(tenant__schema_name=connection.schema_name, is_primary=True).first()
            tenant_domain = domain_obj.domain if domain_obj else None
        data['is_superuser'] = is_superuser
        data['tenant_domain'] = tenant_domain
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
