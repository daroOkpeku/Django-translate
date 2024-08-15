from django import forms
from django.core.exceptions import ValidationError
import re
from django.contrib.auth.models import User 
def check_if_email_exist(value):
     if User.objects.filter(email=value).exists():
         raise ValidationError('this email already exist in database')
     else:
         return value
     
def check_if_email_exist_login(value):
     if User.objects.filter(email=value).exists():
         raise value
 
     

def remove_special_characters(value):
    cleaned_value = re.sub(r'[^A-Za-z0-9 ,\'"]+', '', value)
    if cleaned_value != value:
        raise ValidationError('Special characters are not allowed.')
    return cleaned_value

def validate_password(value):
    if not re.search(r'[^a-zA-Z0-9]', value):
        raise ValidationError(
            _("Password must contain at least one special character."),
            params={'value': value},
        )


class signcheck(forms.Form):
    fullname=forms.CharField(max_length=255, validators=[remove_special_characters])
    username=forms.CharField(max_length=255, validators=[remove_special_characters])
    email=forms.CharField(max_length=255, validators=[check_if_email_exist])
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        validators=[validate_password]
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    )
    
    
    
class logincheck(forms.Form):
    email = forms.CharField(max_length=255, validators=[check_if_email_exist_login])
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}), validators=[validate_password])
    
    
    
class checkid(forms.Form):
    id = forms.IntegerField(max_value=255)
    
    
    
class TransWordValidate(forms.Form):
    fromx = forms.CharField(
        max_length=255,
       strip=True
    )
    to = forms.CharField(
        max_length=255,
         strip=True
    )
    tranword = forms.CharField(
        max_length=255,
        strip=True
    )
    originword = forms.CharField(
        max_length=255,
        strip=True
    )
    
    

class unauthuer(forms.Form):
    ip = forms.CharField(max_length=255)
    times_used = forms.CharField(max_length=255)