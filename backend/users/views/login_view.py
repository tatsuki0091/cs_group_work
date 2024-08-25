from rest_framework import generics

from users.models import User
from users.serializers.login_serializer import LoginUserSerializer
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model, login, logout
from users.validations import Validations
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ValidationError


class LoginUser(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        try:
            validator = Validations(data)
            validator.validate_email()
            validator.validate_password()
            serializer = LoginUserSerializer(data=data)
            if serializer.is_valid():
                user = serializer.check_user(data)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except (ValidationError, Exception) as e:
            print(f"Caught an exception: {e}")
            return Response({'error': e}, status=400)
