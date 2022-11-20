from django.db import models


class User(models.Model):
    username = models.CharField(max_length=255, null=False)
    email = models.EmailField(max_length=255, null=False)
    password = models.CharField(max_length=50)
    ifLogged = models.BooleanField(default=False)
    token = models.CharField(max_length=500, null=True, default="")
    is_email_verified = models.BooleanField(null=True, default=False)
    #when object is first created->auto_now_add
    system_timestamp = models.DateTimeField(auto_now_add=True)
    system_otp = models.IntegerField(null=True)
    password_otp_timestamp = models.DateTimeField(auto_now=True)
    password_otp = models.IntegerField(null=True)
    


class water_model(models.Model):
    water_latitude = models.FloatField(null=True)
    water_longitude = models.FloatField(null=True)


class toilet_model(models.Model):
    toilet_latitude = models.FloatField(null=True)
    toilet_longitude = models.FloatField(null=True)


class wifi_model(models.Model):
    wifi_latitude = models.FloatField(null=True)
    wifi_longitude = models.FloatField(null=True)


class parking_model(models.Model):
    parking_latitude = models.FloatField(null=True)
    parking_longitude = models.FloatField(null=True)


class bench_model(models.Model):
    bench_latitude = models.FloatField(null=True)
    bench_longitude = models.FloatField(null=True)


class Rating_Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amenity_type = models.CharField(max_length=10, null=False)
    amenity_id = models.IntegerField(null=False, default=0)
    # water_id = models.ForeignKey(water_model, on_delete=models.CASCADE)
    # bench_id = models.ForeignKey(bench_model, on_delete=models.CASCADE)
    # wifi_id = models.ForeignKey(wifi_model, on_delete=models.CASCADE)
    # parking_id = models.ForeignKey(parking_model, on_delete=models.CASCADE)
    # toilet_id = models.ForeignKey(toilet_model, on_delete=models.CASCADE)
    rating = models.IntegerField(null=False, default=0)
    review = models.CharField(max_length=255, null=False)
    is_flagged = models.BooleanField(null=True, default=False)
    is_deleted = models.BooleanField(null=True, default=False)
    upvotes = models.IntegerField(null=True, default=0)
    downvotes = models.IntegerField(null=True, default=0)


class average_rating_model(models.Model):
    amenity_type = models.CharField(max_length=10, null=True)
    amenity_id = models.IntegerField(null=True, default=0)
    average_rating = models.IntegerField(null=False)
