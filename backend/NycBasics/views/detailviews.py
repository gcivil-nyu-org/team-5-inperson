from ..models import water_model, wifi_model, parking_model, bench_model, toilet_model

# from .models import amenity_model, user_location_model

from ..serializers import (
    water_modelSerializer,
    wifi_modelSerializer,
    parking_modelSerializer,
    bench_modelSerializer,
    toilet_modelSerializer,
)


from rest_framework import generics


class water_amenity_detail(generics.RetrieveAPIView):
    queryset = water_model.objects.all()
    serializer_class = water_modelSerializer


class wifi_amenity_detail(generics.RetrieveAPIView):
    queryset = wifi_model.objects.all()
    serializer_class = wifi_modelSerializer


class bench_amenity_detail(generics.RetrieveAPIView):
    queryset = bench_model.objects.all()
    serializer_class = bench_modelSerializer


class toilet_amenity_detail(generics.RetrieveAPIView):
    queryset = toilet_model.objects.all()
    serializer_class = toilet_modelSerializer


class parking_amenity_detail(generics.RetrieveAPIView):
    queryset = parking_model.objects.all()
    serializer_class = parking_modelSerializer
