from django.shortcuts import render, redirect
from .models import User
from .signvalidation import signcheck
from .random import geerate_sha1_time
from django.contrib.auth.hashers import make_password
from .mailsend import send_welcome_email
from django.http import JsonResponse

# from django.http import JsonResponse

# Create your views here.


def index(request):
    return render(request,"index.html")



def login(request):
    return render(request,"login.html")


def signup(request):
    return render(request, "signup.html")

def validateaccout(request, code, email):
    return render(request, "confirm.html")
    # user = User.objects.filter(email=email, code=code).first()
    # if user:
    #     return render(request, "confirm.html")
    # else:
    #     return render(request, "error.html")
    

def register(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        form = signcheck(data)
        if form.is_valid():
           fullname = form.cleaned_data.get('fullname', data['fullname'])
           email = form.cleaned_data.get('email', data['email'])
           password = make_password(form.cleaned_data.get('password', data['password']))
           confirm_password = form.cleaned_data.get("confirm_password", data['confirm_password'])
           randomcode = generate_sha1_time()
        #    originurl = #from the frontend
           query = User(fullname=fullname, email=email, code=randomcode, password=password)
           query.save()
           send_welcome_email(firstname, email, originurl)
           return JsonResponse({'data':'successful registered your account'})
        else:
            return JsonResponse({"error": "failed"})