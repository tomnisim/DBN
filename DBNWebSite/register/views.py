from datetime import datetime
from email import message
from multiprocessing import context
from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import HttpResponse
from django.contrib.auth.models import User
from ReactAppCommunication import Response
#from employee.models import Employee
from register.models import EmployeesWaitingForApproval
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse
from site_base.views import homepage
from django.core.mail import send_mail
from register.forms import SingUpForm
import json


def signup(request):
    if request.method == "POST":
        try:
            # Decode and parse the JSON data
            body = request.body.decode('utf-8')
            data = json.loads(body)

            # Extract data from the JSON object
            username = data.get('username')
            fname = data.get('firstName')
            lname = data.get('lastName')
            _id = data.get('idNumber')
            _email = data.get('email')
            _cell_phone = data.get('phoneNumber')
            pass1 = data.get('password')
            pass2 = data.get('confirmPassword')
            msg = ''
            # Perform validation checks
            if User.objects.filter(username=username).exists():
                msg = 'Username already exists'

            elif User.objects.filter(email=_email).exists():
                msg = 'Email address already exists'

            elif pass1 != pass2:
                msg = 'Passwords do not match'

            elif not username.isalnum():
                msg = 'Username must contain both letters and numbers'
            if msg != '':
                return Response.custom_response(False,msg,400)

            # Create a new entry in the EmployeesWaitingForApproval model
            employee_info = EmployeesWaitingForApproval(
                user_name=username,
                first_name=fname,
                last_name=lname,
                id=_id,
                email=_email,
                cell_phone=_cell_phone,
                pass1=pass1,
                pass2=pass2
            )
            employee_info.save()



            return Response.custom_response(True,'Sign-up successfully')

        except Exception as e:
            return Response.custom_response(False, str(e), 500)

def signin(request):
    # print(request)
    try:
        body = request.body.decode('utf-8')  # Decode bytes to string
        data = json.loads(body)  # Parse string to JSON
        if request.method == "POST":
            username = data.get('username')  # Access the JSON data
            pass1 = data.get('pass1')
            user=authenticate(username= username, password= pass1)
            if user:
                login(request, user)
                user_info = {
                    'user_id': user.id,
                    'username': user.username,
                    'is_authenticated': user.is_authenticated,
                }

                session_info = {
                    'session_id': request.session.session_key,
                }

                # Return response with user and session info
                return Response.custom_response(True, "Sign in successfully", user_info=user_info, session_info=session_info)
            return Response.custom_response(False, "wrong username or password")
    except Exception as e:
        return Response.custom_response(False, "sign in failed", Response.create_error_dict(e))


def signout(request):
    logout(request)
    # messages.success(request, "Log out successfully")
    return Response.custom_response(True,'Sign-out successfully')
