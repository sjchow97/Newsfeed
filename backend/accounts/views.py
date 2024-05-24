from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from newsfeed import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from models import UserProfile

from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authtoken.models import Token

# Create your views here.

@ensure_csrf_cookie
def csrf(request):
    return Response({'csrfToken': request.COOKIES.get('csrftoken')})

class Login(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request,user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Login successful', 
                'user': {
                    'username': user.username,
                    'locale': user.userprofile.location
                },
                'token': token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        