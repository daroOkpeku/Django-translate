from django.db import models

# Create your models here.

class User(models.Model):
    fullname = models.CharField(max_length=255, blank=False, null=True )
    email = models.CharField(max_length=500, unique=True, null=True)
    status = models.BooleanField(default=False)
    code = models.CharField(max_length=255, null=False, unique=True)
    password = models.CharField(max_length=255, null=False)
    def __str__(self):
        return self.fulllname
    