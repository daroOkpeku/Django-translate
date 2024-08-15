from django.shortcuts import render, redirect
from .models import Profile
from django.contrib.auth.models import User
from .signvalidation import signcheck, logincheck
from django.forms.models import model_to_dict
# from .random import geerate_sha1_time
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate, login as auth_login
from .mailsend import send_welcome_email 
from django.http import JsonResponse
import json
import hashlib
import time
# from django.http import JsonResponse

# Create your views here.




def index(request):
    return render(request,"index.html")



def login(request):
     if request.user.is_authenticated:
       return redirect("home")
     else:
        return render(request,"login.html")


def signup(request):
    if request.user.is_authenticated:
       return redirect("home")
    else:
        return render(request, "signup.html")

def validateaccout(request, code, email):

    user = User.objects.filter(email=email).first()
    profile = Profile.objects.filter(code=code).first()
    if user and  (profile.status == 0 or profile.status is None):
        profile.status = 1
        profile.save()
        return render(request, "confirm.html")
    else:
        return render(request, "error.html")
    

def register(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        # return JsonResponse(data)

        form = signcheck(data)
        if form.is_valid():
           fullname = form.cleaned_data.get('fullname', data['fullname'])
           username = form.cleaned_data.get('username', data['username'])
           email = form.cleaned_data.get('email', data['email'])
           password = make_password(form.cleaned_data.get('password', data['password']))
           confirm_password = form.cleaned_data.get("confirm_password", data['confirm_password'])
           current_time = str(time.time()).encode('utf-8')
           sha1_hash = hashlib.sha1(current_time).hexdigest()
           randomcode = sha1_hash
           originurl = data['origin']
           user = User( username=username, email=email,  password=password)
           user.save()
           profile = Profile(fullname=fullname, user=user, code=randomcode)
           profile.save()
           send_welcome_email(fullname, email, originurl, randomcode)
           return JsonResponse({'data':'successful registered your account'})
        else:
            return JsonResponse({"error": "failed"})



def signin(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        valid = logincheck(data)
        
        if valid.is_valid():
            email = valid.cleaned_data.get("email", data['email'])
            password = valid.cleaned_data.get("password", data['password'])
            # user = User.objects.filter(email=email).first()
            # if user:
            #     # model_to_dict method convert it to a dictionary
            #     user_dict = model_to_dict(user)
            try:
                user = User.objects.filter(email=email).get()
               
                if user and check_password(password, user.password):
                   
                    auth = authenticate(username=user.username, password=password)
                 
                    if auth is not None:
                        auth_login(request, auth)
                        return JsonResponse({"success": "You have logged in successfully"})
                    else:
                        return JsonResponse({"error": "Authentication failure"})
                else:
                    return JsonResponse({"error": "Please check your password or email"})
            
            except User.DoesNotExist:
                return JsonResponse({'error': 'User does not exist'})
            except Exception as e:
                return JsonResponse({"error": f"Something went wrong: {str(e)}"})
        else:
            return JsonResponse({"error": "Invalid data"})
        
        
def homeview(request):
    if request.user.is_authenticated:
        user = request.user
        obj = {"username":user.username, "email":user.email, "userid":user.id}
        return render(request, 'home.html', {"data":obj})
    
    
def checkauth(request):
    if request.user.is_authenticated:
        user = request.user
        obj = {"username":user.username, "email":user.email, "userid":user.id}
        return JsonResponse({"success": obj})
    else:
         return JsonResponse({"error":'nothing'})