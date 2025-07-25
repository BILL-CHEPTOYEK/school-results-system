from rest_framework import viewsets
from .models import Subject, AssessmentType, Term, Result, GradingScheme, Grade
from .serializers import (
    SubjectSerializer, AssessmentTypeSerializer, TermSerializer, ResultSerializer, GradingSchemeSerializer, GradeSerializer
)

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class AssessmentTypeViewSet(viewsets.ModelViewSet):
    queryset = AssessmentType.objects.all()
    serializer_class = AssessmentTypeSerializer

class TermViewSet(viewsets.ModelViewSet):
    queryset = Term.objects.all()
    serializer_class = TermSerializer

class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

class GradingSchemeViewSet(viewsets.ModelViewSet):
    queryset = GradingScheme.objects.all()
    serializer_class = GradingSchemeSerializer

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
