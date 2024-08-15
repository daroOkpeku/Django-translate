from django.shortcuts import render, redirect
from .models import Profile, Translateword, Authuser
from django.contrib.auth.models import User
from .signvalidation import signcheck, logincheck, checkid, TransWordValidate, unauthuer
from django.forms.models import model_to_dict
# from .random import geerate_sha1_time
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout 
from .mailsend import send_welcome_email 
from django.http import JsonResponse
import json
import hashlib
import time
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
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
     
     

def logout(request):
    auth_logout(request)
    return JsonResponse({"success":"you have logout successful"})


def trash(request):
    if request.method == "POST":
      if request.user.is_authenticated:
          user = request.user
          data = json.loads(request.body.decode("utf-8"))
          form = checkid(data)
          if form.is_valid():
            idx = form.cleaned_data("id", data['id'])
            Translateword.objects.filter(id=idx, user=user.id).delete()
            return JsonResponse({"success":"successful delete"})
          else:
            return JsonResponse({"error":"please enter the correct input "}) 
      else:
          return JsonResponse({"error":"you are not Authorizated to user this api"})
    else:
          return JsonResponse({"error":"something went wrong"})
      
      
      
def tranallwords(request):
    if request.user.is_authenticated:
      tran = Translateword.objects.all()   
      paginate = Paginator(tran, 10)
      page_num = request.GET.get('page')
      try:
          tran_paginate = paginate.page(page_num)
      except PageNotAnInteger:  
          tran_paginate = paginate.page(1)    
      except EmptyPage:
          tran_paginate = paginate.page(page_num)
          return JsonResponse({"success":tran_paginate})
      
      
      




def createtranword(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            try:
                data = json.loads(request.body.decode("utf-8"))
            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON data."}, status=400)

            form = TransWordValidate(data)
            
            if form.is_valid():
                fromx = form.cleaned_data.get("fromx")
                tox = form.cleaned_data.get("to")
                tranword = form.cleaned_data.get("tranword")
                originword = form.cleaned_data.get("originword")
                user = request.user

                query = Translateword(fromx=fromx, to=tox, tranword=tranword, originword=originword, user=user)
                query.save()

                return JsonResponse({'success': "Translation word successfully created."}, status=201)
            else:
                return JsonResponse({"error": "Invalid input. Please check the data and try again.", "details": form.errors}, status=400)
        else:
            return JsonResponse({"error": "You are not authorized to use this API."}, status=403)
    else:
        return JsonResponse({"error": "Only POST requests are allowed."}, status=405)


def my_view(request):
    # ip address
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip_address = x_forwarded_for.split(',')[0]
        return ip_address  
    else:
        ip_address = request.META.get('REMOTE_ADDR')
        return ip_address  
     
     
     
     
def createauthuser(request):
    # if register.method == "POST":
    #     data = json.loads(request.body.decode("utf-8"))
    #     form = unauthuer(data)
        userip = my_view(request)
        userauth = Authuser.objects.filter(ip=userip).first()

        if userauth is not None:
            if userauth.times_used is not None and int(userauth.times_used) < 30:
                num = int(userauth.times_used) + 1
                userauth.times_used = num
                userauth.save()
                return JsonResponse({'success': "successful"})
            elif int(userauth.times_used) == 30:
                return JsonResponse({'error': "please login to translate more"})
        else:
            # If userauth is None, create a new Authuser entry
            qury = Authuser(ip=userip, times_used=1)
            qury.save()
            return JsonResponse({'success': "successful"})


        # if
    # else:
    #     return JsonResponse({"error":"something went wrong"})