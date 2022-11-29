from ..models import water_model, wifi_model, parking_model, bench_model, toilet_model


from ..serializers import (
    water_modelSerializer,
    wifi_modelSerializer,
    parking_modelSerializer,
)
from ..serializers import bench_modelSerializer, toilet_modelSerializer

from rest_framework import generics

latLimit = 0.005
lngLimit = 0.01


def calculations(obj):
    pk1 = -1 * float(obj.kwargs["pk1"])
    pk2 = float(obj.kwargs["pk2"])
    bottom_left_lng = pk1 - lngLimit
    bottom_left_lat = pk2 - latLimit
    top_right_lng = pk1 + lngLimit
    top_right_lat = pk2 + latLimit

    return (
        pk1,
        pk2,
        bottom_left_lng,
        bottom_left_lat,
        top_right_lng,
        top_right_lat,
    )


class water_List(generics.ListAPIView):
    def get_queryset(self):
        (
            pk1,
            pk2,
            bottom_left_lng,
            bottom_left_lat,
            top_right_lng,
            top_right_lat,
        ) = calculations(self)

        water_all = water_model.objects.all()

        narrowed_list = [
            e
            for e in water_all
            if bottom_left_lng <= e.water_longitude <= top_right_lng
            and bottom_left_lat <= e.water_latitude <= top_right_lat  # noqa: W503
        ]
        # print("\nNumber of water resources : " + str(len(narrowed_list)) + "\n")

        # Build your filtered queryset
        narrowed_queryset = water_all.filter(
            water_longitude__in=[e.water_longitude for e in narrowed_list],
            water_latitude__in=[e.water_latitude for e in narrowed_list],
        )
        # Set the cache on the queryset
        # narrowed_queryset._result_cache = narrowed_list

        return narrowed_queryset

    serializer_class = water_modelSerializer


class wifi_List(generics.ListAPIView):
    def get_queryset(self):
        (
            pk1,
            pk2,
            bottom_left_lng,
            bottom_left_lat,
            top_right_lng,
            top_right_lat,
        ) = calculations(self)

        wifi_all = wifi_model.objects.all()

        narrowed_list = [
            e
            for e in wifi_all
            if bottom_left_lng <= e.wifi_longitude <= top_right_lng
            and bottom_left_lat <= e.wifi_latitude <= top_right_lat  # noqa: W503
        ]
        # print("\nNumber of wifi resources : " + str(len(narrowed_list)) + "\n")

        # Build your filtered queryset
        narrowed_queryset = wifi_all.filter(
            wifi_longitude__in=[e.wifi_longitude for e in narrowed_list],
            wifi_latitude__in=[e.wifi_latitude for e in narrowed_list],
        )
        # Set the cache on the queryset
        # narrowed_queryset._result_cache = narrowed_list

        return narrowed_queryset

    serializer_class = wifi_modelSerializer


class parking_List(generics.ListAPIView):
    def get_queryset(self):
        (
            pk1,
            pk2,
            bottom_left_lng,
            bottom_left_lat,
            top_right_lng,
            top_right_lat,
        ) = calculations(self)

        parking_all = parking_model.objects.all()

        narrowed_list = [
            e
            for e in parking_all
            if bottom_left_lng <= e.parking_longitude <= top_right_lng
            and bottom_left_lat <= e.parking_latitude <= top_right_lat  # noqa: W503
        ]
        # print("\nNumber of parking resources : " + str(len(narrowed_list)) + "\n")

        # Build your filtered queryset
        narrowed_queryset = parking_all.filter(
            parking_longitude__in=[e.parking_longitude for e in narrowed_list],
            parking_latitude__in=[e.parking_latitude for e in narrowed_list],
        )
        # Set the cache on the queryset
        # narrowed_queryset._result_cache = narrowed_list

        return narrowed_queryset

    serializer_class = parking_modelSerializer


class bench_List(generics.ListAPIView):
    def get_queryset(self):
        (
            pk1,
            pk2,
            bottom_left_lng,
            bottom_left_lat,
            top_right_lng,
            top_right_lat,
        ) = calculations(self)

        bench_all = bench_model.objects.all()

        narrowed_list = [
            e
            for e in bench_all
            if bottom_left_lng <= e.bench_longitude <= top_right_lng
            and bottom_left_lat <= e.bench_latitude <= top_right_lat  # noqa: W503
        ]
        # print("\nNumber of bench resources : " + str(len(narrowed_list)) + "\n")

        # Build your filtered queryset
        narrowed_queryset = bench_all.filter(
            bench_longitude__in=[e.bench_longitude for e in narrowed_list],
            bench_latitude__in=[e.bench_latitude for e in narrowed_list],
        )
        # Set the cache on the queryset
        # narrowed_queryset._result_cache = narrowed_list

        return narrowed_queryset

    serializer_class = bench_modelSerializer


class toilet_List(generics.ListAPIView):
    def get_queryset(self):
        (
            pk1,
            pk2,
            bottom_left_lng,
            bottom_left_lat,
            top_right_lng,
            top_right_lat,
        ) = calculations(self)

        toilet_all = toilet_model.objects.all()

        narrowed_list = [
            e
            for e in toilet_all
            if bottom_left_lng <= e.toilet_longitude <= top_right_lng
            and bottom_left_lat <= e.toilet_latitude <= top_right_lat  # noqa: W503
        ]
        # print("\nNumber of restroom resources : " + str(len(narrowed_list)) + "\n")

        # Build your filtered queryset
        narrowed_queryset = toilet_all.filter(
            toilet_longitude__in=[e.toilet_longitude for e in narrowed_list],
            toilet_latitude__in=[e.toilet_latitude for e in narrowed_list],
        )
        # Set the cache on the queryset
        # narrowed_queryset._result_cache = narrowed_list

        return narrowed_queryset

    serializer_class = toilet_modelSerializer
