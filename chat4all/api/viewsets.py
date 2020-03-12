from rest_framework import viewsets
from rest_framework.response import Response
from api.models import User, Contact
from api.serializers import UserSerializer, ContactSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    User model view set for the API endpoint.
    Supports the common REST operations.

    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ContactViewSet(viewsets.ModelViewSet):
    """
    Contact model view set for the API endpoint.

    Class attributes:
        queryset (django.db.query.QuerySet):
            Query set for the endpoint.
        serializer_class
            (rest_framework.serializer.HyperlinkedModelSerializer):
            associated serializer class for the Contact model.
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def list(self, request, user_pk=None):
        """
        Lists all the User instances associated with a given User instance
        through the Contact model.

        Parameters:
            request (rest_framework.response.Response):
                HTTP request.
            user_pk (uuid.UUID): Primary key for the user instance.
        """
        user = User.objects.get(pk=user_pk)
        queryset = user.get_contacts()

        return Response(
            UserSerializer(queryset,
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
        user = User.objects.get(pk=user_pk)
        queryset = user.get_contacts(pk)

        return Response(
            UserSerializer(queryset,
                           context={'request': request},
                           ).data)

    def create(self, request, user_pk=None):
        """
        """
        data = request.data
        user = User.objects.get(pk=user_pk)
        if user:
            data['user'] = str(user.id)

        serializer = ContactSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    def destroy(self, request, user_pk=None, pk=None):
        contact = Contact.objects.get(user=user_pk, associate=pk)
        if contact:
            contact.delete()

        return Response({})
