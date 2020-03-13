from django.core.exceptions import ValidationError
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from api.models import User, Contact
from api.serializers import UserSerializer, ContactSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    User model viewset for the API endpoint.
    Supports the common REST operations.

    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ContactViewSet(viewsets.ModelViewSet):
    """
    Contact model viewset for the API endpoint.
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_object(self, user_pk, pk):
        """
        Returns a Contact object by its user id and associate id.

        Parameters:
            user_pk: user id
            pk: associate id
        """
        try:
            return Contact.objects.get(user=user_pk, associate=pk)
        except (Contact.DoesNotExist, ValidationError):
            raise NotFound("The requested contact was not found.")

    def list(self, request, user_pk=None):
        """
        Lists all the User instances associated with a given User instance
        through the Contact model.

        Parameters:
            request (rest_framework.response.Response):
                HTTP request.
            user_pk (uuid.UUID): Primary key for the User instance.
        """
        try:
            user = User.objects.get(pk=user_pk)
        except (ValidationError, User.DoesNotExist):
            raise NotFound(detail="The requested user was not found.")

        queryset = user.get_contacts()

        return Response(
            UserSerializer(queryset,
                           context={'request': request},
                           many=True).data,
            status=status.HTTP_200_OK)

    def retrieve(self, request, user_pk=None, pk=None):
        """
        Retrieves a User instance associated with a given User instance
        through the Contact model, if it exists.

        Parameters:
            request (rest_framework.response.Response):
                HTTP request.
            user_pk (uuid.UUID): Primary key for the User instance.
            pk (uuid.UUID): Primary key for the associated Contact instance.
        """
        try:
            user = User.objects.get(pk=user_pk)
        except (ValidationError, User.DoesNotExist):
            raise NotFound(detail="The requested user was not found.")

        queryset = user.get_contacts(pk)
        if not queryset:
            raise NotFound(detail="The requested contact was not found.")

        return Response(
            UserSerializer(queryset,
                           context={'request': request},
                           ).data,
            status=status.HTTP_200_OK)

    def create(self, request, user_pk=None):
        """
        Creates a Connection instance from two given User instances: the
        user itself and its associate.

        Parameters:
            request (rest_framework.response.Response):
                HTTP request.
            user_pk (uuid.UUID): Primary key for the user instance.
            pk (uuid.UUID): Primary key for the associated user instance.
        """
        data = request.data
        data['user'] = user_pk

        serializer = ContactSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    def destroy(self, request, user_pk=None, pk=None):
        """
        Destroys a Connection instance, if found

        Parameters:
            request (rest_framework.response.Response):
                HTTP request.
            user_pk (uuid.UUID): Primary key for the user instance.
            pk (uuid.UUID): Primary key for the associated user instance.
        """
        instance = self.get_object(user_pk, pk)
        instance.delete()
        user = User.objects.get(pk=user_pk)
        queryset = user.get_contacts()

        return Response(
            UserSerializer(queryset,
                           context={'request': request},
                           many=True).data,
            status=status.HTTP_202_ACCEPTED)
