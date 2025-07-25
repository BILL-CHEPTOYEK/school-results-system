from .views import UserViewSet, RoleViewSet, PermissionViewSet, UserPermissionViewSet, RolePermissionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'roles', RoleViewSet)
router.register(r'permissions', PermissionViewSet)
router.register(r'user-permissions', UserPermissionViewSet)
router.register(r'role-permissions', RolePermissionViewSet)

urlpatterns = router.urls
