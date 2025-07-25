from rest_framework.routers import DefaultRouter
from .views import (
    SubjectViewSet, AssessmentTypeViewSet, TermViewSet, ResultViewSet, GradingSchemeViewSet, GradeViewSet
)

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'assessment-types', AssessmentTypeViewSet)
router.register(r'terms', TermViewSet)
router.register(r'results', ResultViewSet)
router.register(r'grading-schemes', GradingSchemeViewSet)
router.register(r'grades', GradeViewSet)

urlpatterns = router.urls
