from rest_framework import serializers
from .models import Subject, AssessmentType, Term, Result, GradingScheme, Grade

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class AssessmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssessmentType
        fields = '__all__'

class TermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Term
        fields = '__all__'

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'

class GradingSchemeSerializer(serializers.ModelSerializer):
    grades = GradeSerializer(many=True, read_only=True)
    class Meta:
        model = GradingScheme
        fields = '__all__'
