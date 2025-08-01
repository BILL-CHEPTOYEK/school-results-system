from rest_framework import viewsets
from .models import Class
from .serializers import ClassSerializer

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    from rest_framework.permissions import IsAuthenticated
    permission_classes = [IsAuthenticated]
