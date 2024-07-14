from django.contrib.auth.backends import BaseBackend
from users.models import User


class CustomUserBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        print('authenticateauthenticateauthenticate')
        try:
            user = User.objects.get(email=email)
            print(user)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
