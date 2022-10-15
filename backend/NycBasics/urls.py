from django.urls import path, register_converter
from . import converters, views
register_converter(converters.FloatUrlParameterConverter, 'float')

urlpatterns = [
    path('api/water/<float:pk1>/<float:pk2>/', views.water_List.as_view() ),
    path('api/wifi/<float:pk1>/<float:pk2>/', views.wifi_List.as_view() ),
    path('api/bench/<float:pk1>/<float:pk2>/', views.bench_List.as_view() ),
    path('api/toilet/<float:pk1>/<float:pk2>/', views.toilet_List.as_view() ),
    path('api/parking/<float:pk1>/<float:pk2>/', views.parking_List.as_view() ),        
]