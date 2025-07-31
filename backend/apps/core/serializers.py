from rest_framework import serializers
from .models import Client

class TenantCreateSerializer(serializers.Serializer):
    school_name = serializers.CharField(max_length=100)
    school_type = serializers.CharField(max_length=32)
    school_address = serializers.CharField(max_length=255)
    school_phone = serializers.CharField(max_length=32)
    admin_name = serializers.CharField(max_length=100)
    admin_email = serializers.EmailField()
    admin_phone = serializers.CharField(max_length=32, required=False, allow_blank=True)
    admin_password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        # Actual creation is handled in the view
        pass

class ClientListSerializer(serializers.ModelSerializer):
    admin_name = serializers.SerializerMethodField()
    admin_email = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = ["id", "name", "school_type", "school_address", "school_phone", "admin_name", "admin_email"]

    def get_admin_name(self, obj):
        if obj.admin:
            return obj.admin.get_full_name() or obj.admin.username
        return None

    def get_admin_email(self, obj):
        if obj.admin:
            return obj.admin.email
        return None
