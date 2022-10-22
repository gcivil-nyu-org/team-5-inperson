from django.db import models


class water_model(models.Model):
    name = "water"
    water_latitude = models.FloatField(null=True)
    water_longitude = models.FloatField(null=True)
    """
    water_FountainType = models.CharField(max_length = 10000, null=True)
    water_the_geom = models.CharField(max_length = 10000, null=True)
    water_Location = models.CharField(max_length = 10000, null=True)
    water_Place = models.CharField(max_length = 10000, null=True)
    water_BoroCode = models.IntegerField(null=True)
    water_Availability = models.CharField(max_length = 10000, null=True)
    water_Latitude = models.FloatField(null=True)
    water_Longitude = models.FloatField(null=True)
    """
    def __str__(self):
        return (
            self.name
            + "_lng_"
            + str(self.water_longitude)
            + "_lat_"
            + str(self.water_latitude)
        )
        """
        return (
            self.name
            + "_lng_"
            + str(self.water_Longitude)
            + "_lat_"
            + str(self.water_Latitude)
        )
        """


class toilet_model(models.Model):
    name = "toilet"
    toilet_latitude = models.FloatField(null=True)
    toilet_longitude = models.FloatField(null=True)
    """
    toilet_BoroCode = models.IntegerField(null=True)
    toilet_open_year_round = models.CharField(max_length = 10000, null=True)
    toilet_Latitude = models.FloatField(null=True)
    toilet_Longitude = models.FloatField(null=True)
    toilet_place_id = models.CharField(max_length = 10000, null=True)   
    """
    def __str__(self):
        return (
            self.name
            + "_lng_"
            + str(self.toilet_longitude)
            + "_lat_"
            + str(self.toilet_latitude)
        )
        """
        return (
            self.name
            + "_lng_"
            + str(self.toilet_Longitude)
            + "_lat_"
            + str(self.toilet_Latitude)
        )
        """
        


class wifi_model(models.Model):
    name = "wifi"
    wifi_latitude = models.FloatField(null=True)
    wifi_longitude = models.FloatField(null=True)
    """
    wifi_the_geom = models.CharField(max_length = 10000, null=True)
    wifi_Type = models.CharField(max_length = 5000, null=True)
    wifi_PROVIDER = models.CharField(max_length = 5000, null=True)
    wifi_NAME = models.CharField(max_length = 5000, null=True)
    wifi_Latitude = models.FloatField(null=True)
    wifi_Longitude = models.FloatField(null=True)
    wifi_X = models.FloatField(null=True)
    wifi_Y = models.FloatField(null=True)
    wifi_Location = models.CharField(max_length = 10000, null=True)
    wifi_Remarks = models.CharField(max_length = 10000, null=True)
    wifi_SSID = models.CharField(max_length = 10000, null=True)
    wifi_SourceId = models.CharField(max_length = 10000, null=True)
    wifi_BoroCode = models.IntegerField(null=True)
    """

    def __str__(self):
        return (
            self.name
            + "_lng_"
            + str(self.wifi_longitude)
            + "_lat_"
            + str(self.wifi_latitude)
        )
        """
        return (
            self.name
            + "_lng_"
            + str(self.wifi_Longitude)
            + "_lat_"
            + str(self.wifi_Latitude)
        )
        """


class parking_model(models.Model):
    name = "parking"
    parking_latitude = models.FloatField(null=True)
    parking_longitude = models.FloatField(null=True)
    """
    parking_the_geom = models.CharField(max_length = 10000, null=True)
    parking_STATUS = models.CharField(max_length = 10000, null=True)
    parking_SHAPE_Leng = models.FloatField(null=True)
    parking_SHAPE_Area = models.FloatField(null=True)
    parking_Latitude = models.FloatField(null=True) 
    parking_Longitude = models.FloatField(null=True)
    """
    def __str__(self):
        return (
            self.name
            + "_lng_"
            + str(self.parking_longitude)
            + "_lat_"
            + str(self.parking_latitude)
        )
        """
        return (
            self.name
            + "_lng_"
            + str(self.parking_Longitude)
            + "_lat_"
            + str(self.parking_Latitude)
        )
        """


class bench_model(models.Model):
    name = "bench"
    bench_latitude = models.FloatField(null=True)
    bench_longitude = models.FloatField(null=True)
    """
    bench_the_geom = models.CharField(max_length = 5000, null=True)
    bench_BoroCode = models.IntegerField(null=True)
    bench_Category = models.CharField(max_length = 5000, null=True)
    bench_BenchType = models.CharField(max_length = 5000, null=True)
    bench_Latitude = models.FloatField(null=True)
    bench_Longitude = models.FloatField(null=True)
    """
    def __str__(self):
        return (
            self.name
            + "_lng_"
            + str(self.bench_longitude)
            + "_lat_"
            + str(self.bench_latitude)
        )
        """
        return (
            self.name
            + "_lng_"
            + str(self.bench_Longitude)
            + "_lat_"
            + str(self.bench_Latitude)
        )
        """


"""  
below stuff not useful for now :

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
