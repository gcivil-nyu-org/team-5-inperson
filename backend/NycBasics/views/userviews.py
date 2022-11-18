from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from ..models import User
from ..serializers import UserSerializer, UserLoginSerializer, UserLogoutSerializer
import random
from django.conf import settings
from django.core.mail import send_mail

class Record(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class Login(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer_class = UserLoginSerializer(data=request.data)

        if serializer_class.is_valid(raise_exception=True):
            return Response(serializer_class.data, status=HTTP_200_OK)
        return Response(serializer_class.errors, status=HTTP_400_BAD_REQUEST)


class Logout(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserLogoutSerializer

    def post(self, request, *args, **kwargs):
        serializer_class = UserLogoutSerializer(data=request.data)
        if serializer_class.is_valid(raise_exception=True):
            return Response(serializer_class.data, status=HTTP_200_OK)
        return Response(serializer_class.errors, status=HTTP_400_BAD_REQUEST)


class Email_Verification(generics.GenericAPIView):
    queryset = User.objects.all()
    def get_queryset(self):
        #username, user_entered_otp
        pk1 = self.kwargs["pk1"]
        pk2 = int(self.kwargs["pk2"])
        
        user_all = User.objects.all()

        relevant_ratings = user_all.filter(
            username=pk1,            
        )

        return relevant_ratings
    serializer_class = UserSerializer
