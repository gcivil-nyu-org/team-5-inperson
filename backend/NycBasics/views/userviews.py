from django.shortcuts import redirect
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from ..models import User
from ..serializers import UserSerializer, UserLoginSerializer, UserLogoutSerializer


class Record(generics.CreateAPIView):
    # get method handler
    queryset = User.objects.all()

    # def get_queryset(self):
    #     username = self.kwargs["username"],
    #     email = self.kwargs["email"],
    #     password = self.kwargs["password"]
    #     # print("username",username)

    #     queryset = User.objects.create(username=username,email=email,password=password)
    #     print("querySet", queryset)
    #     return queryset

    serializer_class = UserSerializer

    # def get(self, request, *args, **kwargs):
    #     print("kwargs", kwargs)
    #     serializer_class = UserSerializer(data=kwargs)
    #     print("Users", User.objects.all())

    #     if serializer_class.is_valid(raise_exception=True):
    #         # user = serializer_class.save()
    #         return Response(serializer_class.data, status=HTTP_200_OK)
    #     return Response(serializer_class.errors, status=HTTP_400_BAD_REQUEST)


class Login(generics.GenericAPIView):
    # get method handler
    queryset = User.objects.all()
    print(queryset)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        # serializer_class = UserLoginSerializer(data=kwargs)
        serializer_class = UserLoginSerializer(data=request.data)
        print("args", args)
        print("kwargs", kwargs)
        print("request", request)
        print("request.data", request.data)

        if serializer_class.is_valid(raise_exception=True):
            return Response(serializer_class.data, status=HTTP_200_OK)
        return Response(serializer_class.errors, status=HTTP_400_BAD_REQUEST)

    # def get(self, request, *args, **kwargs):
    #     serializer_class = UserLoginSerializer(data=kwargs)
    #     print("args", args)
    #     print("kwargs", kwargs)
    #     print("request", request)
    #     print("request.data", request.data)

    #     if serializer_class.is_valid(raise_exception=True):
    #         return Response(serializer_class.data, status=HTTP_200_OK)
    #     return Response(serializer_class.errors, status=HTTP_400_BAD_REQUEST)


class Logout(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserLogoutSerializer

    def post(self, request, *args, **kwargs):
        serializer_class = UserLogoutSerializer(data=request.data)
        if serializer_class.is_valid(raise_exception=True):
            return Response(serializer_class.data, status=HTTP_200_OK)
        return Response(serializer_class.errors, status=HTTP_400_BAD_REQUEST)

    # def get(self, request, *args, **kwargs):
    #     print("args", args)
    #     print("kwargs", kwargs)
    #     print("request", request)
    #     print("request.data", request.data)

    #     serializer_class = UserLogoutSerializer(data=kwargs)
    #     if serializer_class.is_valid(raise_exception=True):
    #         return Response(serializer_class.data, status=HTTP_200_OK)
    #     return Response(serializer_class.errors, status=HTTP_400_BAD_REQUEST)


def index(request):
    return redirect("/api/login")
