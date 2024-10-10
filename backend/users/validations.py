from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()


class Validations:
    def __init__(self, data):
        self.email = data.get('email', '').strip()
        self.first_name = data.get('first_name', '').strip()
        self.username = data.get('username', '').strip()
        self.password = data.get('password', '').strip()
        self.last_name = data.get('last_name', '').strip()
        self.introduction = data.get('introduction', '').strip()

    def required(self, column, key):
        if not column or column == '':
            raise ValidationError(key + ' is required')
        return True

    def min_length(self, column, number):
        if len(column) < number:
            raise ValidationError('At least you need' +
                                  str(number) + ' character for ' + column)
        return True

    def validate_email(self):
        self.required(self.email, 'Email')
        return True

    def validate_username(self):
        self.required(self.username, 'Username')
        return True

    def validate_first_name(self):
        self.required(self.first_name, 'First name')
        self.min_length(self.username, 2)
        return True

    def validate_last_name(self):
        self.required(self.first_name, 'Last name')
        self.min_length(self.first_name, 2)
        return True

    def validate_password(self):
        self.required(self.password, 'Passwod')
        self.min_length(self.password, 8)
        return True
