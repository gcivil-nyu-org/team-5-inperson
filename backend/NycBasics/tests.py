from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIRequestFactory
from NycBasics.views.listviews import *
import json
from rest_framework.test import APIClient

"""
wsp
const defaultCenter = {
  lat: 40.73122901747168,
  lng: -73.99733029154993
};
tandon
const testingCenter = {
  lat: 40.69447082266228,
  lng: -73.9863413463988
};
"""


class ApiTests(TestCase):
    def test_water_api(self):
        view = water_List.as_view()
        factory = APIRequestFactory()
        request = factory.get("/NycBasics/api/water/40.0004/73.0004/")

        self.client = APIClient()
        t1 = water_model.objects.create(
            water_longitude=-73.0004, water_latitude=40.0004
        )
        t2 = water_model.objects.create(
            water_longitude=-73.0003, water_latitude=40.0003
        )
        t3 = water_model.objects.create(
            water_longitude=-73.99765615667471, water_latitude=40.73031601946951
        )
        t4 = water_model.objects.create(
            water_longitude=-73.99084611065203, water_latitude=40.728739273506626
        )

        response = view(request, pk1="73.99733029154993", pk2="40.73122901747168")
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["id"], 3)
        self.assertEqual(response.data[0]["water_latitude"], 40.73031601946951)
        self.assertEqual(response.data[0]["water_longitude"], -73.99765615667471)

        self.assertEqual(response.data[1]["id"], 4)
        self.assertEqual(response.data[1]["water_latitude"], 40.728739273506626)
        self.assertEqual(response.data[1]["water_longitude"], -73.99084611065203)
        """
        print((response.data[0]['id']))
              
        print((response.data[0]['water_latitude'])) 
            
        print((response.data[0]['water_longitude']))
        """

    def test_bench_api(self):
        view = bench_List.as_view()
        factory = APIRequestFactory()
        request = factory.get("/NycBasics/api/bench/40.0004/73.0004/")

        self.client = APIClient()
        t1 = bench_model.objects.create(
            bench_longitude=-73.0004, bench_latitude=40.0004
        )
        t2 = bench_model.objects.create(
            bench_longitude=-73.0003, bench_latitude=40.0003
        )
        t3 = bench_model.objects.create(
            bench_longitude=-73.99765615667471, bench_latitude=40.73031601946951
        )
        t4 = bench_model.objects.create(
            bench_longitude=-73.99084611065203, bench_latitude=40.728739273506626
        )

        response = view(request, pk1="73.0002", pk2="40.0002")
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["id"], 1)
        self.assertEqual(response.data[0]["bench_latitude"], 40.0004)
        self.assertEqual(response.data[0]["bench_longitude"], -73.0004)

        self.assertEqual(response.data[1]["id"], 2)
        self.assertEqual(response.data[1]["bench_latitude"], 40.0003)
        self.assertEqual(response.data[1]["bench_longitude"], -73.0003)

    def test_wifi_api(self):
        view = wifi_List.as_view()
        factory = APIRequestFactory()
        request = factory.get("/NycBasics/api/wifi/40.0004/73.0004/")

        self.client = APIClient()
        t1 = wifi_model.objects.create(wifi_longitude=-73.0004, wifi_latitude=40.0004)
        t2 = wifi_model.objects.create(wifi_longitude=-73.0003, wifi_latitude=40.0003)
        t3 = wifi_model.objects.create(
            wifi_longitude=-73.97990920046949, wifi_latitude=40.694623000165095
        )
        t4 = wifi_model.objects.create(
            wifi_longitude=-73.98607399979622, wifi_latitude=40.69665199978469
        )

        response = view(request, pk1="73.9863413463988", pk2="40.69447082266228")
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["id"], 3)
        self.assertEqual(response.data[0]["wifi_latitude"], 40.694623000165095)
        self.assertEqual(response.data[0]["wifi_longitude"], -73.97990920046949)

        self.assertEqual(response.data[1]["id"], 4)
        self.assertEqual(response.data[1]["wifi_latitude"], 40.69665199978469)
        self.assertEqual(response.data[1]["wifi_longitude"], -73.98607399979622)

    def test_parking_api(self):
        view = parking_List.as_view()
        factory = APIRequestFactory()
        request = factory.get("/NycBasics/api/parking/40.0004/73.0004/")

        self.client = APIClient()
        t1 = parking_model.objects.create(
            parking_longitude=-73.0007, parking_latitude=40.0007
        )
        t2 = parking_model.objects.create(
            parking_longitude=-73.0008, parking_latitude=40.0008
        )
        t3 = parking_model.objects.create(
            parking_longitude=-73.99765615667471, parking_latitude=40.73031601946951
        )
        t4 = parking_model.objects.create(
            parking_longitude=-73.99084611065203, parking_latitude=40.728739273506626
        )

        response = view(request, pk1="73.0006", pk2="40.0006")
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["id"], 1)
        self.assertEqual(response.data[0]["parking_latitude"], 40.0007)
        self.assertEqual(response.data[0]["parking_longitude"], -73.0007)

        self.assertEqual(response.data[1]["id"], 2)
        self.assertEqual(response.data[1]["parking_latitude"], 40.0008)
        self.assertEqual(response.data[1]["parking_longitude"], -73.0008)

    def test_toilet_api(self):
        view = toilet_List.as_view()
        factory = APIRequestFactory()
        request = factory.get("/NycBasics/api/toilet/40.0004/73.0004/")

        self.client = APIClient()
        t1 = toilet_model.objects.create(
            toilet_longitude=-73.0009, toilet_latitude=40.0009
        )
        t2 = toilet_model.objects.create(
            toilet_longitude=-73.0001, toilet_latitude=40.0001
        )
        t3 = toilet_model.objects.create(
            toilet_longitude=-73.99765615667471, toilet_latitude=40.73031601946951
        )
        t4 = toilet_model.objects.create(
            toilet_longitude=-73.99084611065203, toilet_latitude=40.728739273506626
        )

        response = view(request, pk1="73.0004", pk2="40.0004")
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["id"], 1)
        self.assertEqual(response.data[0]["toilet_latitude"], 40.0009)
        self.assertEqual(response.data[0]["toilet_longitude"], -73.0009)

        self.assertEqual(response.data[1]["id"], 2)
        self.assertEqual(response.data[1]["toilet_latitude"], 40.0001)
        self.assertEqual(response.data[1]["toilet_longitude"], -73.0001)
