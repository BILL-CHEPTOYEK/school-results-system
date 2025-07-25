from django.contrib.auth.models import AbstractUser
from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    roles = models.ManyToManyField('Role', through='UserRole', related_name='users', through_fields=('user', 'role'))

class UserRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    assigned_by = models.ForeignKey(User, related_name='assigned_roles', on_delete=models.SET_NULL, null=True, blank=True)
    assigned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'role')

    def __str__(self):
        return f"{self.user.username} - {self.role.name}"
