from django import forms


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