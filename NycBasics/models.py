from django.db import models


class water_model(models.Model):
    name = "water"
    water_latitude = models.FloatField(null=True)
    water_longitude = models.FloatField(null=True)

    def __str__(self):
        return (
            self.name
            + "_lng_"
            + str(self.water_longitude)
            + "_lat_"
            + str(self.water_latitude)
        )


class toilet_model(models.Model):
    name = "toilet"
    toilet_latitude = models.FloatField(null=True)
    toilet_longitude = models.FloatField(null=True)

    def __str__(self):
        return (
            self.name
            + "_lng_"
            + str(self.toilet_longitude)
            + "_lat_"
            + str(self.toilet_latitude)
        )


class wifi_model(models.Model):
    name = "wifi"
    wifi_latitude = models.FloatField(null=True)
    wifi_longitude = models.FloatField(null=True)

    def __str__(self):
        return (
            self.name
            + "_lng_"
            + str(self.wifi_longitude)
            + "_lat_"
            + str(self.wifi_latitude)
        )


class parking_model(models.Model):
    name = "parking"
    parking_latitude = models.FloatField(null=True)
    parking_longitude = models.FloatField(null=True)

    def __str__(self):
        return (
            self.name
            + "_lng_"
            + str(self.parking_longitude)
            + "_lat_"
            + str(self.parking_latitude)
        )


class bench_model(models.Model):
    name = "bench"
    bench_latitude = models.FloatField(null=True)
    bench_longitude = models.FloatField(null=True)

    def __str__(self):
        return (
            self.name
            + "_lng_"
            + str(self.bench_longitude)
            + "_lat_"
            + str(self.bench_latitude)
        )


"""  
class user_location_model(models.Model):
    name = "user_location"
    user_latitude = models.FloatField(null=True)
    user_longitude = models.FloatField(null=True)

    def __str__(self):
        return self.name+"_lng_"+str(self.user_longitude)+"_lat_"+str(self.user_latitude)

class amenity_model(models.Model):    
    category = (
        ('water','water'),
        ('toilet','toilet'),
        ('wifi','wifi'),
        ('parking','parking'),
        ('bench','bench'),
    )
    amenity_type = models.CharField(max_length=200,null=True,choices=category)

    def __str__(self):
        return self.amenity_type

"""
