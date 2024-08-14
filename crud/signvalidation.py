from django import forms
import re
from django.contrib.auth.models import User 
def check_if_email_exist(value):
     if User.objects.filter(email=value).exists():
         raise ValidationError('this email already exist in database')
     else:
         return value
     

def remove_special_characters(value):
    cleaned_value = re.sub(r'[^A-Za-z0-9 ]+', '', value)
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
    fullname:forms.CharField(max_length=255, validators=[remove_special_characters])
    email:forms.CharField(max_length=255, validators=[check_if_email_exist])
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        validators=[validate_password]
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    )