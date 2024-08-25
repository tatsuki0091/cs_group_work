from rest_framework import serializers
from users.models import User
from users.serializers.utilities import SerializerUtilities


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def check_user(self, dlean_data):
        SerializerUtilities.check_user(self, dlean_data)
