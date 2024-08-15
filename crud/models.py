from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    fullname = models.CharField(max_length=255, blank=False, null=True )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # username = models.CharField(max_length=255, unique=True, null=False)
    # email = models.CharField(max_length=500, unique=True, null=True)
    status = models.BooleanField(default=False)
    code = models.CharField(max_length=255, null=False, unique=True)
    # password = models.CharField(max_length=255, null=False)
    def __str__(self):
        return self.fulllname
    