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
    class Meta:
        model = Client
        fields = ["id", "name", "school_type", "school_address", "school_phone"]
