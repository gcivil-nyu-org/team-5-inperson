from django.urls import path, register_converter
from . import converters, views

register_converter(converters.FloatUrlParameterConverter, "float")

urlpatterns = [
    path("api/water/<float:pk2>/<float:pk1>/", views.water_List.as_view()),
    path("api/wifi/<float:pk2>/<float:pk1>/", views.wifi_List.as_view()),
    path("api/bench/<float:pk2>/<float:pk1>/", views.bench_List.as_view()),
    path("api/toilet/<float:pk2>/<float:pk1>/", views.toilet_List.as_view()),
    path("api/parking/<float:pk2>/<float:pk1>/", views.parking_List.as_view()),

    path("api/water/<int:pk>/", views.water_amenity_detail.as_view()),
    path("api/wifi/<int:pk>/", views.wifi_amenity_detail.as_view()),
    path("api/bench/<int:pk>/", views.bench_amenity_detail.as_view()),
    path("api/toilet/<int:pk>/", views.toilet_amenity_detail.as_view()),
    path("api/parking/<int:pk>/", views.parking_amenity_detail.as_view()),
]
