from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from ..models import User
from ..serializers import UserSerializer, ResetSerializer, UserSerializer_SendEmail, UserLoginSerializer, UserLogoutSerializer, EmailSerializer, ResetSerializer_SendEmail
import random
from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone

class Record(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Record_SendEmail(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer_SendEmail

class Reset_Password(generics.ListAPIView):
    def get_queryset(self):
        pk1 = self.kwargs["pk1"]
        pk2 = int(self.kwargs["pk2"])
        user_all = User.objects.all()
        
        relevant_user_q = user_all.filter(
            email=pk1,          
        )
        relevant_user_q.update(password_otp=pk2)
        relevant_user_q.update(password_otp_timestamp=timezone.now())
        return relevant_user_q
    
    serializer_class = ResetSerializer

class Reset_Password_SendEmail(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = ResetSerializer_SendEmail


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


class Email_Verification(generics.ListAPIView):    
    def get_queryset(self):
        #email_id, user_entered_otp
        pk1 = self.kwargs["pk1"]
        #u_email = pk1[6:]
        #u_otp = pk1[:6]
        #pk1 = u_email
        #pk2 = int(u_otp)
        pk2 = int(self.kwargs["pk2"])
        #print("pk1",pk1)
        #print("pk2",pk2)
        
        user_all = User.objects.all()
        
        relevant_user_q = user_all.filter(
            email=pk1,          
        )
        print("relevant_user_q count: ", relevant_user_q.count())
        
        if relevant_user_q.count()!=0:
            print("inside if exists relevant_user_q: ", relevant_user_q)
            relevant_user = list(relevant_user_q)
            now_aware = timezone.now()
            """
            print(" relevant_user[0].emailveri: ",relevant_user[0].is_email_verified)
            print(" relevant_user[0].email: ",relevant_user[0].email)
            print(" relevant_user[0].sysotp: ",relevant_user[0].system_otp)
            print(" relevant_user[0].systime: ",relevant_user[0].system_timestamp)
            print(" datetime now: ", now_aware)
            """
            
            if pk2 == relevant_user[0].system_otp:
                timediff = now_aware - relevant_user[0].system_timestamp
                print(timediff.total_seconds())            
                if timediff.total_seconds() <= 3600:
                    #print("in time")
                    relevant_user_q.update(is_email_verified=True)                    
                else:
                    #print("not in time, delete user")
                    relevant_user_q.update(is_email_verified=False)                
                    relevant_user_q.delete()
            else:
                #print("otp doesnt match, delete user")
                relevant_user_q.update(is_email_verified=False)                
                relevant_user_q.delete()


        return relevant_user_q

    serializer_class = EmailSerializer


class Reset_Password_Verification(generics.ListAPIView):    
    def get_queryset(self):
        #email_id, user_entered_otp
        pk1 = self.kwargs["pk1"]
        #u_email = pk1[6:]
        #u_otp = pk1[:6]
        #pk1 = u_email
        #pk2 = int(u_otp)
        pk2 = int(self.kwargs["pk2"])
        #print("pk1",pk1)
        #print("pk2",pk2)
        pk3 = self.kwargs["pk3"]
        
        user_all = User.objects.all()
        
        relevant_user_q = user_all.filter(
            email=pk1,          
        )
        print("pass_reset relevant_user_q count: ", relevant_user_q.count())
        
        if relevant_user_q.count()!=0:
            print("inside if exists relevant_user_q: ", relevant_user_q)
            relevant_user = list(relevant_user_q)
            now_aware = timezone.now()
            """
            print(" relevant_user[0].emailveri: ",relevant_user[0].is_email_verified)
            print(" relevant_user[0].email: ",relevant_user[0].email)
            print(" relevant_user[0].sysotp: ",relevant_user[0].system_otp)
            print(" relevant_user[0].systime: ",relevant_user[0].system_timestamp)
            print(" datetime now: ", now_aware)
            """
            
            if pk2 == relevant_user[0].password_otp:
                timediff = now_aware - relevant_user[0].password_otp_timestamp
                print(timediff.total_seconds())            
                if timediff.total_seconds() <= 3600:
                    #print("in time, update password")
                    relevant_user_q.update(password=pk3)                                      
                else:
                    #print("not in time, no update to password")                              
                    
                    relevant_user_q = User.objects.none()
            else:
                #print("otp doesnt match, no update to password")                               
                
                relevant_user_q = User.objects.none()


        return relevant_user_q

    serializer_class = ResetSerializer
