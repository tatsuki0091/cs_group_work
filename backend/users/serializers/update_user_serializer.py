from rest_framework import serializers
from users.models import User
from users.serializers.utilities import SerializerUtilities
from common.mixins.trim_string_fields_mixin import TrimStringFieldsMixin


class UpdateUserSerializer(TrimStringFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def check_user(self, dlean_data):
        SerializerUtilities.check_user(self, dlean_data)
