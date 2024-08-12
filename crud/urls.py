from django.urls import path
from django.contrib.auth.decorators import login_required

from crud import views


urlpatterns = [
    path("", views.index, name="index"),
]