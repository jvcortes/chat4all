from rest_framework import viewsets
from rest_framework.response import Response
from api import models
from api import serializers


class UserViewSet(viewsets.ModelViewSet):
    """
    User model view set for the API endpoint.
    Supports the common REST operations.

    Class attributes:
        queryset (django.db.models.query.QuerySet):
            Query set for the endpoint.
        serializer_class
            (rest_framework.serializer.HyperlinkedModelSerializer):
            associated serializer class for the User model.
    """
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class ContactViewSet(viewsets.ModelViewSet):
    """
    Contact model view set for the API endpoint.

    Class attributes:
        queryset (django.db.models.query.QuerySet):
            Query set for the endpoint.
        serializer_class
            (rest_framework.serializer.HyperlinkedModelSerializer):
            associated serializer class for the Contact model.
    """
    queryset = models.Contact.objects.all()
    serializer_class = serializers.ContactSerializer

    def list(self, request, user_pk=None):
        """
        Lists all the User instances associated with a given User instance
        through the Contact model.

        Parameters:
            request (rest_framework.response.Response):
                HTTP request.
            user_pk (uuid.UUID): Primary key for the user instance.
        """
        user = models.User.objects.get(pk=user_pk)
        queryset = user.get_contacts()

        return Response(
            serializers.UserSerializer(queryset,
                                       context={'request': request},
                                       many=True).data)

    def retrieve(self, request, user_pk=None, pk=None):
        """
        Retrieves a User instance associated with a given User instance
        through the Contact model, if it exists.

        Parameters:
            request (rest_framework.response.Response):
                HTTP request.
            user_pk (uuid.UUID): Primary key for the user instance.
            pk (uuid.UUID): Primary key for the associated user instance.
        """
        user = models.User.objects.get(pk=user_pk)
        queryset = user.get_contacts(pk)

        return Response(
            serializers.UserSerializer(queryset,
                                       context={'request': request},
                                       ).data)
