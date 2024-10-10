from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError


class SerializerUtilities():
    def check_user(self, clean_data):
        # print(clean_data['email'])
        user = authenticate(
            email=clean_data['email'], password=clean_data['password'])
        if not user:
            print('sdfsfasdfasddfasdfasdfasjkngdrkfngksaz')
            raise ValidationError('user not found')
        return user
