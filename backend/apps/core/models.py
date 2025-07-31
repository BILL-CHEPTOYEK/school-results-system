from django.db import models
from django_tenants.models import TenantMixin, DomainMixin


class Client(TenantMixin):
    name = models.CharField(max_length=100)
    school_type = models.CharField(max_length=32, blank=True, null=True)
    school_address = models.CharField(max_length=255, blank=True, null=True)
    school_phone = models.CharField(max_length=32, blank=True, null=True)
    paid_until = models.DateField(null=True, blank=True)
    on_trial = models.BooleanField(default=True)
    created_on = models.DateField(auto_now_add=True)


    admin = models.ForeignKey('users.User', null=True, blank=True, on_delete=models.SET_NULL, related_name='admin_clients')
    # default true, schema will be automatically created and synced when it is saved
    auto_create_schema = True

    def __str__(self):
        return self.name

class Domain(DomainMixin):
    pass
