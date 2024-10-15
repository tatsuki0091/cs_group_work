from rest_framework import generics

from users.models import User
from users.serializers.create_user_serializer import CreateUserSerializer
from rest_framework.decorators import api_view
# To return JSON
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.views import APIView


class CreateEvent(generics.CreateAPIView):
    # Need serializer_class
    serializer_class = CreateUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print('sdfsd')
        return Response(status=status.HTTP_201_CREATED)
        # if serializer.is_valid():
        #     # Register the data
        #     self.perform_create(serializer)
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     # Response error message
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
