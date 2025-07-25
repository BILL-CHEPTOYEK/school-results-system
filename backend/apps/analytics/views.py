from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.students.models import Student
from apps.results.models import Result, Subject, Term
from apps.reports.models import Report
from django.db.models import Avg, Sum

class StudentPerformanceTrendView(APIView):
    def get(self, request, student_id):
        # Returns average score per term for a student
        results = Result.objects.filter(student_id=student_id)
        data = (
            results.values('term__year', 'term__name')
            .annotate(average=Avg('score'))
            .order_by('term__year', 'term__name')
        )
        return Response(list(data))

class ClassPerformanceSummaryView(APIView):
    def get(self, request, class_name):
        # Returns average score per subject for a class
        results = Result.objects.filter(student__student_class=class_name)
        data = (
            results.values('subject__name')
            .annotate(average=Avg('score'))
            .order_by('subject__name')
        )
        return Response(list(data))

class SubjectAnalyticsView(APIView):
    def get(self, request, subject_id):
        # Returns average, top, and bottom performer for a subject
        results = Result.objects.filter(subject_id=subject_id)
        avg_score = results.aggregate(average=Avg('score'))['average']
        top = results.order_by('-score').first()
        bottom = results.order_by('score').first()
        return Response({
            'average': avg_score,
            'top_performer': str(top.student) if top else None,
            'top_score': top.score if top else None,
            'bottom_performer': str(bottom.student) if bottom else None,
            'bottom_score': bottom.score if bottom else None,
        })

class TermComparisonView(APIView):
    def get(self, request, student_id):
        # Compare current vs previous term average for a student
        results = Result.objects.filter(student_id=student_id)
        terms = (
            results.values('term__year', 'term__name')
            .annotate(average=Avg('score'))
            .order_by('-term__year', '-term__name')
        )
        terms = list(terms)
        if len(terms) < 2:
            return Response({'error': 'Not enough data for comparison.'}, status=400)
        return Response({
            'current_term': terms[0],
            'previous_term': terms[1],
            'difference': float(terms[0]['average']) - float(terms[1]['average'])
        })
