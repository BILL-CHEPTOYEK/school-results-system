from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('-created_at')
    serializer_class = StudentSerializer

# custom view to get students by class
    def get_students_by_class(self, class_id):
        students = self.queryset.filter(class_id=class_id)
        serializer = self.serializer_class(students, many=True)
        return serializer.data