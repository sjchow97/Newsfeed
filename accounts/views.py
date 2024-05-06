from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from newsfeed import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# Create your views here.

def Login(request):
    
    # Create a new user
    # new_user = User.objects.create_user(username='username', email='email@example.com', password='password')

    
    next = request.GET.get('next', '/home/')
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
    

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(next)
        else:
            return HttpResponse('Invalid login')
    return render(request, 'login.html', {'redirect_to': next})

def Logout(request):
    logout(request)
    return HttpResponseRedirect(settings.LOGIN_URL)

@login_required
def Home(request):
    return render(request, 'home.html', {})

