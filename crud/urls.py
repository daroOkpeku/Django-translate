from django.urls import path
from django.contrib.auth.decorators import login_required

from crud import views


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login, name="login"),
    path("signup", views.signup, name="signup"),
    path("confirm/<code>/<email>", views.validateaccout, name="confirm"),
    path("register", views.register, name="register"),
    path("signin", views.signin, name="signin"),
    path("home",  login_required(views.homeview), name="home"),
    path("checkauth", views.checkauth, name="checkauth"),
    path("logout", views.logout, name="logout"),
    path("trash", views.trash, name="trash"),
    path("createtranword", views.createtranword, name="createtranword"),
    path("createauthuser", views.createauthuser, name="createauthuser")
]