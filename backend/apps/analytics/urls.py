from django.urls import path
from .views import (
    StudentPerformanceTrendView, ClassPerformanceSummaryView, SubjectAnalyticsView, TermComparisonView
)

urlpatterns = [
    path('student/<int:student_id>/trend/', StudentPerformanceTrendView.as_view(), name='student-performance-trend'),
    path('class/<str:class_name>/summary/', ClassPerformanceSummaryView.as_view(), name='class-performance-summary'),
    path('subject/<int:subject_id>/analytics/', SubjectAnalyticsView.as_view(), name='subject-analytics'),
    path('student/<int:student_id>/term-comparison/', TermComparisonView.as_view(), name='term-comparison'),
]
