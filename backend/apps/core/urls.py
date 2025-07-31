from django.urls import path
from .views import TenantListCreateView, PublicSuperAdminCreateView

urlpatterns = [
    path('tenants/', TenantListCreateView.as_view(), name='tenant-list-create'),
    path('public-superadmin/', PublicSuperAdminCreateView.as_view(), name='public-superadmin-create'),
]
