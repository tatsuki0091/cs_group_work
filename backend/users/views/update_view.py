from rest_framework import generics
from users.models import User
from users.serializers.update_user_serializer import UpdateUserSerializer
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework import status, permissions
from users.validations import validate_username, validate_email, validate_password, validate_firstname
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from django.core.exceptions import ValidationError


class UserUpdate(generics.GenericAPIView):
    # Initialize selializer
    serializer_class = UpdateUserSerializer

    def get(self, request):
        # Get jwt info
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            # Split Bearer part and content part
            token = auth_header.split(' ')[1]
            try:
                access_token = AccessToken(token)
                payload = access_token.payload
                # Fetch user infoi
                userInfo = User.objects.get(username=payload['username'])
                userSerializer = UpdateUserSerializer(userInfo)
                return Response({'userInfo': userSerializer.data}, status=200)
            except TokenError as e:
                return Response({'error': str(e)}, status=400)
        else:
            return Response({'error': 'Authorization header missing or invalid'}, status=400)

    # Update a current user data
    def patch(self, request):
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            # Get token data
            token = auth_header.split(' ')[1]
            data = request.data
            # Check password

            try:
                # Check values
                validate_email(data)
                validate_username(data)
                if data['password'] == '':
                    del data['password']
                else:
                    validate_password(data)
                    data['password'] = make_password(data['password'])

                # Take access token
                access_token = AccessToken(token)
                payload = access_token.payload

                # Fetch user info
                userInfo = User.objects.get(username=payload['username'])

                # Set the new data
                serializer = self.get_serializer(
                    instance=userInfo, data=data, partial=True)

                # Check serializer
                if serializer.is_valid():
                    # Update
                    serializer.save()
                    return Response({'userInfo': serializer.data}, status=200)
                else:
                    return Response({'userInfo': serializer.data}, status=200)
            except (ValidationError, TokenError, Exception) as e:
                print(f"Caught an exception: {e}")
                return Response({'error': e}, status=400)
        else:
            return Response({'error': 'Authorization header missing or invalid'}, status=400)
