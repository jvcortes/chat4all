from api.models import User, Contact
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from rest_framework.exceptions import ValidationError, NotFound


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id',
                  'first_name',
                  'last_name',
                  'gender',
                  'email',
                  'profile_picture',
                  'created_at',
                  'updated_at']


class ContactSerializer(serializers.ModelSerializer):
    user = serializers.UUIDField()
    associate = serializers.UUIDField()

    class Meta:
        model = Contact
        validators = [
            UniqueTogetherValidator(
                queryset=model.objects.all(),
                fields=['user', 'associate']
            )
        ]

        fields = ['user', 'associate']

    def validate_user(self, value):
        try:
            User.objects.get(id=value)
        except (ValidationError, User.DoesNotExist):
            raise NotFound("The requested resource does not exist.")
        return value

    def validate_associate(self, value):
        try:
            User.objects.get(id=value)
        except (ValidationError, User.DoesNotExist):
            raise NotFound("The user associated with the ID does not"
                           " exist.")
        return value

    def create(self, validated_data):
        validated_data['user'] = User.objects.get(
            id=validated_data['user']
        )
        validated_data['associate'] = User.objects.get(
            id=validated_data['associate']
        )
        return Contact.objects.create(**validated_data)

    def destroy(self, validated_data):
        instance = Contact.objects.get(
            user=validated_data['user'],
            associate=validated_data['associate']
        )
        instance.delete()
