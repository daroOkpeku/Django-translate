from django.urls import path
from django.contrib.auth.decorators import login_required

from crud import views


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login, name="login"),
    path("signup", views.signup, name="signup"),
    path("confirm/<code>/<email>", views.validateaccout, name="confirm")
]