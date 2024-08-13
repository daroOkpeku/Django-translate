from django.shortcuts import render, redirect
from .models import User
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