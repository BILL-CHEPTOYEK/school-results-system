from django.urls import path
from .views import PasswordResetRequestView, PasswordResetConfirmView, PasswordChangeView

urlpatterns = [
    path('password/reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password/change/', PasswordChangeView.as_view(), name='password_change'),
]
