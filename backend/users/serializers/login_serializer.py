from rest_framework import serializers
from users.models import User
from django.contrib.auth import get_user_model, authenticate
from rest_framework import permissions, status
from django.core.exceptions import ValidationError
# UserModel = get_user_model()


class LoginUserSerializer(serializers.Serializer):
    # email = serializers.EmailField()
    email = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        # print(clean_data['email'])
        user = authenticate(
            email=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user
