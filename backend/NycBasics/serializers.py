from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import (
    User,
    water_model,
    wifi_model,
    parking_model,
    bench_model,
    toilet_model,
    Rating_Review,
    average_rating_model,
)
from django.core.exceptions import ValidationError
from uuid import uuid4
from django.db.models import Q
from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone
from threading import Timer
from django.contrib.auth.hashers import make_password, check_password


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(max_length=25)
    system_otp = serializers.IntegerField(required=True)

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
            "system_otp",
            "system_timestamp",
            "is_email_verified",
        )


class UserSerializer_SendEmail(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
    )
    username = serializers.CharField(
        required=True,
    )
    password = serializers.CharField(max_length=25)
    system_otp = serializers.IntegerField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password", "system_otp")

    def save(self):
        email = self.validated_data["email"]
        system_otp = self.validated_data["system_otp"]
        subject = "NYC Basics Verification Code"
        message = f"Enter the following code to complete your signup. It is valid for 1 hour.\n{system_otp}"
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [
            email,
        ]
        send_mail(subject, message, from_email, recipient_list)
        # print("mail sent")

        # hash password
        user = User.objects.get(email=email)
        user.password = make_password(user.password)
        user.save()

        secs = 600

        def delete_if_not_verified():
            user = User.objects.get(email=email)
            # print("hello world")
            # print("user.is_email_verified", user.is_email_verified)

            if user.is_email_verified is False:
                user.delete()

        t = Timer(secs, delete_if_not_verified)
        # print("timer started")
        t.start()
        # print("timer ends")


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "is_email_verified",
            "username",
        )


class ResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "password_otp",
            "password_otp_timestamp",
            "system_timestamp",
            "password",
        )


class ResetSerializer_SendEmail(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password_otp = serializers.IntegerField(required=True)

    class Meta:
        model = User
        fields = (
            "email",
            "password_otp",
            "password_otp_timestamp",
        )

    def save(self):
        email = self.validated_data["email"]
        password_otp = self.validated_data["password_otp"]
        subject = "NYC Basics Password Reset Code"
        message = f"Your password reset code is :\n{password_otp}"
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [
            email,
        ]
        send_mail(subject, message, from_email, recipient_list)
        # print("password reset mail sent")


class UserLoginSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField()
    password = serializers.CharField()
    token = serializers.CharField(required=False, read_only=True)
    token1 = serializers.CharField(required=False, read_only=True)
    token2 = serializers.CharField(required=False, read_only=True)
    token3 = serializers.CharField(required=False, read_only=True)
    username = serializers.CharField(required=False, read_only=True)

    def validate(self, data):

        # user,email,password validator
        user_id = data.get("user_id", None)
        password = data.get("password", None)

        print("")
        if not user_id and not password:
            raise ValidationError("Details not entered.")
        user = None

        # if the email has been passed
        if "@" in user_id:
            user = User.objects.filter(Q(email=user_id)).distinct()

            if not user.exists():
                raise ValidationError("User credentials are not correct.")
            user = User.objects.get(email=user_id)
            userpass = user.password
            checkpass = check_password(password, userpass)
            if checkpass is False:
                raise ValidationError("Incorrect password.")
            print("")
            print("")
            print("check pass:", checkpass)
            print("")
            print("")
        else:
            user = User.objects.filter(Q(username=user_id)).distinct()
            if not user.exists():
                raise ValidationError("User credentials are not correct.")
            user = User.objects.get(username=user_id)
            userpass = user.password
            checkpass = check_password(password, userpass)
            if checkpass is False:
                raise ValidationError("Incorrect password.")
            print("")
            print("")
            print("check pass:", checkpass)
            print("")
            print("")

        user.session_id = 0
        if user.ifLogged1 is False:
            user.ifLogged1 = True
            data["token"] = uuid4()
            user.token1 = data["token"]
            user.token_timestamp1 = timezone.now()
            user.session_id = 1
            user.save()
            data["username"] = user.username
            data["id"] = user.id
            data["session_id"] = user.session_id
            data["ifLogged1"] = user.ifLogged1
            return data

        if user.ifLogged2 is False:
            user.ifLogged2 = True
            data["token"] = uuid4()
            user.token2 = data["token"]
            user.token_timestamp2 = timezone.now()
            user.session_id = 2
            user.save()
            data["username"] = user.username
            data["id"] = user.id
            data["session_id"] = user.session_id
            data["ifLogged2"] = user.ifLogged2
            return data

        if user.ifLogged3 is False:
            user.ifLogged3 = True
            data["token"] = uuid4()
            user.token3 = data["token"]
            user.token_timestamp3 = timezone.now()
            user.session_id = 3
            user.save()
            data["username"] = user.username
            data["id"] = user.id
            data["session_id"] = user.session_id
            data["ifLogged3"] = user.ifLogged3
            return data
        """
        x=datetime.today()
        #y=x.replace(day=x.day, hour=1, minute=0, second=0, microsecond=0)
        #delta_t=y-x

        secs=20
        print("user login status:",user.ifLogged)
        def hello_world():
            user.ifLogged = False
            user.token = ""
            y = timezone.now()
            delta = y-user.token_timestamp
            print("delta",delta.total_seconds)
            print("user logs out:",user.ifLogged)
            print("user name:",user.username)

        t = Timer(secs, hello_world)
        t.start()
        """
        raise ValidationError(
            "User already logged in/max multiple login limit exceeded"
        )

    class Meta:
        model = User
        fields = (
            "token",
            "user_id",
            "password",
            "username",
            "id",
            "session_id",
            "token1",
            "token2",
            "token3",
        )

        read_only_fields = ("token", "token1", "token2", "token3", "username")


class UserLogoutSerializer(serializers.ModelSerializer):
    token = serializers.CharField()
    status = serializers.CharField(required=False, read_only=True)
    session_id = serializers.IntegerField()

    def validate(self, data):
        token = data.get("token", None)
        session_id = data.get("session_id", None)
        # print(token)
        # print(session_id)
        user = None
        try:
            if session_id == 1:
                user = User.objects.get(token1=token)
                user.ifLogged1 = False
                user.token1 = ""
                user.token_timestamp1 = None
                user.save()
                data["status"] = "User is logged out."
                return data

            if session_id == 2:
                user = User.objects.get(token2=token)
                user.ifLogged2 = False
                user.token2 = ""
                user.token_timestamp2 = None
                user.save()
                data["status"] = "User is logged out."
                return data

            if session_id == 3:
                user = User.objects.get(token3=token)
                user.ifLogged3 = False
                user.token3 = ""
                user.token_timestamp3 = None
                user.save()
                data["status"] = "User is logged out."
                return data

            raise ValidationError("User is not logged in.")
        except Exception as e:
            raise ValidationError(str(e))

    class Meta:
        model = User
        fields = (
            "token",
            "status",
            "session_id",
        )


class water_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = water_model
        fields = "__all__"


class wifi_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = wifi_model
        fields = "__all__"


class bench_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = bench_model
        fields = "__all__"


class toilet_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = toilet_model
        fields = "__all__"


class parking_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = parking_model
        fields = "__all__"


class rating_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating_Review
        fields = "__all__"
        # depth = 1


class review_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating_Review
        fields = "__all__"


class avgrating_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = average_rating_model
        fields = "__all__"
