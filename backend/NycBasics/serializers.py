from rest_framework import serializers
from .models import water_model, wifi_model, parking_model, bench_model, toilet_model
#, amenity_model, user_location_model


class water_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = water_model
        fields = '__all__'

class wifi_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = wifi_model
        fields = '__all__'


class bench_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = bench_model
        fields = '__all__'


class toilet_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = toilet_model
        fields = '__all__'


class parking_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = parking_model
        fields = '__all__'

"""
class amenity_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = amenity_model
        fields = '__all__'


class user_location_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_location_model
        fields = '__all__'
"""