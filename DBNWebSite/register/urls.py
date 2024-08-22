from django.urls import path, include
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', csrf_exempt(views.signin), name="signin"),
    path('signup', csrf_exempt(views.signup), name="signup"),
    path('signout', csrf_exempt(views.signout), name="signout"),
    path('', include('site_base.urls')), 
]
