from django.urls import path, re_path

# from . import converters
from .views import userviews, listviews, detailviews

# from .views import listviews, detailviews

# register_converter(converters.FloatUrlParameterConverter, "float")

urlpatterns = [
    re_path(
        r"^api/water/(?P<pk2>[\d\.\d]+)/(?P<pk1>[\d\.\d]+)/$",
        listviews.water_List.as_view(),
        name="waterlist",
    ),
    re_path(
        r"^api/wifi/(?P<pk2>[\d\.\d]+)/(?P<pk1>[\d\.\d]+)/$",
        listviews.wifi_List.as_view(),
        name="wifilist",
    ),
    re_path(
        r"^api/bench/(?P<pk2>[\d\.\d]+)/(?P<pk1>[\d\.\d]+)/$",
        listviews.bench_List.as_view(),
        name="benchlist",
    ),
    re_path(
        r"^api/toilet/(?P<pk2>[\d\.\d]+)/(?P<pk1>[\d\.\d]+)/$",
        listviews.toilet_List.as_view(),
        name="toiletlist",
    ),
    re_path(
        r"^api/parking/(?P<pk2>[\d\.\d]+)/(?P<pk1>[\d\.\d]+)/$",
        listviews.parking_List.as_view(),
        name="parkinglist",
    ),
    path(
        "api/water/<int:pk>/",
        detailviews.water_amenity_detail.as_view(),
        name="waterdetail",
    ),
    path(
        "api/wifi/<int:pk>/",
        detailviews.wifi_amenity_detail.as_view(),
        name="wifidetail",
    ),
    path(
        "api/bench/<int:pk>/",
        detailviews.bench_amenity_detail.as_view(),
        name="benchdetail",
    ),
    path(
        "api/toilet/<int:pk>/",
        detailviews.toilet_amenity_detail.as_view(),
        name="toiletdetail",
    ),
    path(
        "api/parking/<int:pk>/",
        detailviews.parking_amenity_detail.as_view(),
        name="parkingdetail",
    ),
    path("api/addUser/", userviews.Record.as_view(), name="register"),
    # path('addUser/<str:username>/<str:email>/<str:password>/', Record.as_view(), name="register"),
    path(
        "login/<str:user_id>/<str:password>/", userviews.Login.as_view(), name="login"
    ),
    # path('login/', Login.as_view(), name="login"),
    path("logout/<str:token>/", userviews.Logout.as_view(), name="logout"),
    # path('logout/', Logout.as_view(), name="logout"),
]
