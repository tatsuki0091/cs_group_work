from rest_framework import generics
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import logout
from rest_framework_simplejwt.authentication import JWTAuthentication


class Logout(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        logout(request)
        response = Response(status=status.HTTP_200_OK)

        return response
