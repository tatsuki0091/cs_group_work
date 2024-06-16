from rest_framework import generics

from users.models import User
from users.serializers.create_user_serializer import CreateUserSerializer
from rest_framework.decorators import api_view
# To return JSON
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.views import APIView

class Login(generics.GenericAPIView):
    
    