from rest_framework import generics

from users.models import User
from .serializers.create_user_serializer import CreateUserSerializer
from rest_framework.decorators import api_view
# To return JSON
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.views import APIView


class CreateUser(generics.CreateAPIView):
    # Need serializer_class
    print('vadsbgdrbrwtbrtb')
    serializer_class = CreateUserSerializer
    print('create createcreatecreatecreate')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Register the data
            o
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Response error message
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(generics.GenericAPIView):
    def post(self, request):
        serializer = self.get_serializer(data=request.data)