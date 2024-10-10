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
from django.http import HttpResponse


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
                response = Response(status=status.HTTP_200_OK)
                # response = HttpResponse('Test')
                response.set_cookie(
                    key='access_token',
                    value=str(refresh.access_token),
                    httponly=True,
                    max_age=60 * 60 * 24,
                    # max_age=10800,
                    # httponly=False,
                    # secure=False,  # 開発中はFalseにしてテスト
                    # samesite='None',  # またはNone
                    # path='/'
                )

                response.set_cookie(
                    key='refresh',
                    value=str(refresh),
                    httponly=True,
                    max_age=60 * 60 * 24,
                    # max_age=10800,
                    # httponly=False,
                    # secure=False,  # 開発中はFalseにしてテスト
                    # samesite='None',  # またはNone
                    # path='/'
                )

                response.data = data
                return response
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except (ValidationError, Exception) as e:
            print(f"Caught an exception: {e}")
            return Response({'error': e}, status=400)
