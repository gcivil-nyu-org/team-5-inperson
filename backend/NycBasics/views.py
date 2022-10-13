from .models import water_model, wifi_model, parking_model, bench_model, toilet_model
#from .models import amenity_model, user_location_model

from .serializers import water_modelSerializer, wifi_modelSerializer, parking_modelSerializer
from .serializers import bench_modelSerializer, toilet_modelSerializer

from rest_framework import generics



class water_List(generics.ListAPIView):
    queryset = water_model.objects.all()
    serializer_class = water_modelSerializer

class wifi_List(generics.ListAPIView):
    queryset = wifi_model.objects.all()
    serializer_class = wifi_modelSerializer

class parking_List(generics.ListAPIView):
    queryset = parking_model.objects.all()
    serializer_class = parking_modelSerializer

class bench_List(generics.ListAPIView):
    queryset = bench_model.objects.all()
    serializer_class = bench_modelSerializer

class toilet_List(generics.ListAPIView):
    queryset = toilet_model.objects.all()
    serializer_class = toilet_modelSerializer


            