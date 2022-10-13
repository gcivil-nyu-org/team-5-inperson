from django.urls import path
from . import views

urlpatterns = [
    path('api/water/', views.water_List.as_view() ),
    path('api/wifi/', views.wifi_List.as_view() ),
    path('api/bench/', views.bench_List.as_view() ),
    path('api/toilet/', views.toilet_List.as_view() ),
    path('api/parking/', views.parking_List.as_view() ),        
]