from rest_framework import viewsets
from .models import Report
from .serializers import ReportSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import FileResponse, Http404
from .services import generate_or_update_report
from .pdf_utils import generate_report_pdf

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

    @action(detail=True, methods=['get'])
    def pdf(self, request, pk=None):
        try:
            report = self.get_object()
        except Report.DoesNotExist:
            raise Http404
        buffer = generate_report_pdf(report)
        return FileResponse(buffer, as_attachment=True, filename=f'report_{report.student}_{report.term}_{report.year}.pdf')

    @action(detail=False, methods=['post'])
    def generate(self, request):
        student_id = request.data.get('student_id')
        term_id = request.data.get('term_id')
        year = request.data.get('year')
        if not (student_id and term_id and year):
            return Response({'error': 'student_id, term_id, and year are required.'}, status=400)
        from apps.students.models import Student
        from apps.results.models import Term
        try:
            student = Student.objects.get(id=student_id)
            term = Term.objects.get(id=term_id)
        except (Student.DoesNotExist, Term.DoesNotExist):
            return Response({'error': 'Invalid student or term.'}, status=404)
        report = generate_or_update_report(student, term, year)
        serializer = self.get_serializer(report)
        return Response(serializer.data)
