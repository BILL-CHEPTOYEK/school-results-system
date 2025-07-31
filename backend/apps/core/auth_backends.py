from django.contrib.auth.backends import ModelBackend
from django_tenants.utils import schema_context, get_public_schema_name
from django.contrib.auth import get_user_model
from django.db import connection

UserModel = get_user_model()

class PublicSuperAdminFallbackBackend(ModelBackend):
    """
    Custom backend: If user not found in current schema, check public schema for superadmin.
    Allows public superadmin to log in from any tenant or public domain.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        # Try normal auth in current schema
        user = super().authenticate(request, username=username, password=password, **kwargs)
        if user is not None:
            return user
        # Fallback: try public schema
        if connection.schema_name != get_public_schema_name():
            with schema_context(get_public_schema_name()):
                try:
                    user = UserModel.objects.get(username=username)
                    if user.check_password(password):
                        return user
                except UserModel.DoesNotExist:
                    return None
        return None
