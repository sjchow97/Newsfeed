from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authtoken.models import Token

@ensure_csrf_cookie
def csrf(request):
    return Response({'csrfToken': request.COOKIES.get('csrftoken')})

# Login API endpoint with view
# returns: user information and token if login is successful
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
                    'id': user.id,
                    'name': user.get_full_name(),
                    'username': user.username,
                    'locale': user.userprofile.location
                },
                'token': token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Logout API endpoint with view
# prerequisite: user must be authenticated with a token
class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        