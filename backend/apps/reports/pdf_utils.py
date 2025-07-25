from io import BytesIO
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from .models import Report

def generate_report_pdf(report: Report):
    buffer = BytesIO()
    p = canvas.Canvas(buffer)
    p.drawString(100, 800, f"Report Card for {report.student}")
    p.drawString(100, 780, f"Term: {report.term} Year: {report.year}")
    p.drawString(100, 760, f"Total Marks: {report.total_marks}")
    p.drawString(100, 740, f"Average: {report.average}")
    p.drawString(100, 720, f"Grade: {report.grade}")
    p.drawString(100, 700, f"Position: {report.position}")
    if report.comments:
        p.drawString(100, 680, f"Comments: {report.comments}")
    p.showPage()
    p.save()
    buffer.seek(0)
    return buffer
