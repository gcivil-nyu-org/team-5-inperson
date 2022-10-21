from django.urls import path, register_converter
from . import converters, views

register_converter(converters.FloatUrlParameterConverter, "float")

urlpatterns = [
    path("api/water/<float:pk2>/<float:pk1>/", views.water_List.as_view()),
    path("api/wifi/<float:pk2>/<float:pk1>/", views.wifi_List.as_view()),
    path("api/bench/<float:pk2>/<float:pk1>/", views.bench_List.as_view()),
    path("api/toilet/<float:pk2>/<float:pk1>/", views.toilet_List.as_view()),
    path("api/parking/<float:pk2>/<float:pk1>/", views.parking_List.as_view()),
]
