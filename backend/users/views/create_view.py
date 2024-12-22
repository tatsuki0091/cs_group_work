from rest_framework import generics
from django.db import DatabaseError
from users.serializers.create_user_serializer import CreateUserSerializer
from rest_framework.decorators import api_view
# To return JSON
from rest_framework.response import Response
from rest_framework import status


class CreateUser(generics.CreateAPIView):
    # Need serializer_class
    serializer_class = CreateUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Register the data
            try:
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except (DatabaseError, Exception) as e:
                # TODO Write record log handling
                return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Response error message
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
