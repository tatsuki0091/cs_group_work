from rest_framework import generics
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication


class Logout(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = [JWTAuthentication]

    def post(self, _request):
        try:
            # Dlete cookies
            response = Response(status=status.HTTP_200_OK)
            response.delete_cookie('access_token')
            response.delete_cookie('refresh')
            return response
        except (Exception) as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
