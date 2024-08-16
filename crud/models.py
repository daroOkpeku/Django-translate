from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    fullname = models.CharField(max_length=255, blank=False, null=True )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    code = models.CharField(max_length=255, null=False, unique=True)
    def __str__(self):
        return self.fulllname
    
    

class Translateword(models.Model):
    fromx = models.CharField(max_length=100, null=True)
    to = models.CharField(max_length=100, null=True)
    tranword = models.CharField(max_length=500, null=True)
    originword = models.CharField(max_length=500, null=True)
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  
    def __str__(self):
        return self.fromx
    
    
    

class Authuser(models.Model):
    ip = models.CharField(max_length=255, null=True)
    times_used = models.CharField(max_length=255, null=True)
    def __str__(self):
        return self.ip
    