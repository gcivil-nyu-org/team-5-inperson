from django.db import models


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
