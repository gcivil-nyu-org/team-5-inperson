from django.db import models


class User(models.Model):
    username = models.CharField(max_length=255, null=False)
    email = models.EmailField(max_length=255, null=False)
    password = models.CharField(max_length=50)
    ifLogged = models.BooleanField(default=False)
    token = models.CharField(max_length=500, null=True, default="")

    def __str__(self):
        return "{} -{}".format(self.username, self.email)


class water_model(models.Model):
    # name = "water"
    water_latitude = models.FloatField(null=True)
    water_longitude = models.FloatField(null=True)


class toilet_model(models.Model):
    # name = "toilet"
    toilet_latitude = models.FloatField(null=True)
    toilet_longitude = models.FloatField(null=True)


class wifi_model(models.Model):
    # name = "wifi"
    wifi_latitude = models.FloatField(null=True)
    wifi_longitude = models.FloatField(null=True)


class parking_model(models.Model):
    # name = "parking"
    parking_latitude = models.FloatField(null=True)
    parking_longitude = models.FloatField(null=True)


class bench_model(models.Model):
    # name = "bench"
    bench_latitude = models.FloatField(null=True)
    bench_longitude = models.FloatField(null=True)
