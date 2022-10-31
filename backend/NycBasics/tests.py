from django.test import TestCase
from rest_framework.test import APIRequestFactory
from NycBasics.views.listviews import (
    water_List,
    wifi_List,
    bench_List,
    parking_List,
    toilet_List,
    water_model,
    wifi_model,
    parking_model,
    bench_model,
    toilet_model,
)
from NycBasics.views.userviews import Login, Logout, User
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

    # def test_valid_addUser(self):
    #     view = Record.as_view()
    #     factory = APIRequestFactory()
    #     self.client = APIClient()

    #     request = factory.post('/NycBasics/api/addUser/', {'username': 'user1', 'email': 'user1@test.com', 'password': 'testpass'})
    #     response = view(request)

    #     # print("response", response)
    #     # print("response.data", response.data)
    #     # print("response.status_code", response.status_code)

    #     isValidStatus = 200 <= response.status_code < 300
    #     # print("isValidStatus", isValidStatus)

    #     self.assertTrue(isValidStatus)

    # def test_duplicate_username_addUser(self):
    #     view = Record.as_view()
    #     factory = APIRequestFactory()
    #     self.client = APIClient()

    #     User.objects.create(username="user1", email="user2@test.com", password="testpass")

    #     request = factory.post('/NycBasics/api/addUser/', {'username': 'user1', 'email': 'user1@test.com', 'password': 'testpass'})
    #     response = view(request)

    #     # print("response", response)
    #     # print("response.data", response.data)
    #     # print("response.status_code", response.status_code)

    #     isInvalidStatus = 400 <= response.status_code < 500
    #     # print("isInvalidStatus", isInvalidStatus)

    #     self.assertTrue(isInvalidStatus)

    #     # print("response.data.username", response.data['username'])
    #     # print("response.data.username", response.data['username'][0])

    #     self.assertEqual(response.data['username'][0], "This field must be unique.")

    # def test_duplicate_email_addUser(self):
    #     view = Record.as_view()
    #     factory = APIRequestFactory()
    #     self.client = APIClient()

    #     User.objects.create(username="user2", email="user1@test.com", password="testpass")

    #     request = factory.post('/NycBasics/api/addUser/', {'username': 'user1', 'email': 'user1@test.com', 'password': 'testpass'})
    #     response = view(request)

    #     # print("response", response)
    #     # print("response.data", response.data)
    #     # print("response.status_code", response.status_code)

    #     isInvalidStatus = 400 <= response.status_code < 500
    #     # print("isInvalidStatus", isInvalidStatus)

    #     self.assertTrue(isInvalidStatus)

    #     # print("response.data.email", response.data['email'])
    #     # print("response.data.email", response.data['email'][0])

    #     self.assertEqual(response.data['email'][0], "This field must be unique.")

    def test_valid_login(self):
        view = Login.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()

        User.objects.create(
            username="user1", email="user1@test.com", password="testpass"
        )

        request = factory.post(
            "/NycBasics/api/login/",
            {"user_id": "user1@test.com", "password": "testpass"},
        )
        response = view(request)

        isValidStatus = 200 <= response.status_code < 300
        self.assertTrue(isValidStatus)

        tokenExists = response.data.get("token", False)
        self.assertTrue(tokenExists)

    def test_incomplete_login(self):
        view = Login.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()

        User.objects.create(
            username="user1", email="user1@test.com", password="testpass"
        )

        request = factory.post(
            "/NycBasics/api/login/", {"user_id": "user1@test.com", "password": "wrong"}
        )
        response = view(request)

        isInvalidStatus = 400 <= response.status_code < 500
        self.assertTrue(isInvalidStatus)

        tokenExists = response.data.get("token", False)
        self.assertFalse(tokenExists)

        self.assertEqual(
            response.data["non_field_errors"][0], "User credentials are not correct."
        )

    def test_missing_char_login(self):
        view = Login.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()

        User.objects.create(
            username="user1", email="user1@test.com", password="testpass"
        )

        request = factory.post(
            "/NycBasics/api/login/",
            {"user_id": "user1test.com", "password": "testpass"},
        )
        response = view(request)

        isInvalidStatus = 400 <= response.status_code < 500
        self.assertTrue(isInvalidStatus)

        tokenExists = response.data.get("token", False)
        self.assertFalse(tokenExists)

        # print("resopnes", response.data)

        self.assertEqual(
            response.data["non_field_errors"][0], "User credentials are not correct."
        )

    def test_duplicate_login(self):
        view = Login.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()

        User.objects.create(
            username="user1", email="user1@test.com", password="testpass"
        )

        request1 = factory.post(
            "/NycBasics/api/login/",
            {"user_id": "user1@test.com", "password": "testpass"},
        )
        response1 = view(request1)

        isValidStatus = 200 <= response1.status_code < 300
        self.assertTrue(isValidStatus)

        tokenExists = response1.data.get("token", False)
        self.assertTrue(tokenExists)

        request2 = factory.post(
            "/NycBasics/api/login/",
            {"user_id": "user1@test.com", "password": "testpass"},
        )
        response2 = view(request2)

        isInvalidStatus = 400 <= response2.status_code < 500
        self.assertTrue(isInvalidStatus)

        self.assertEqual(
            response2.data["non_field_errors"][0], "User already logged in."
        )

    def test_valid_logout(self):
        login_view = Login.as_view()
        logout_view = Logout.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()

        User.objects.create(
            username="user1", email="user1@test.com", password="testpass"
        )

        login_req = factory.post(
            "/NycBasics/api/login/",
            {"user_id": "user1@test.com", "password": "testpass"},
        )
        login_res = login_view(login_req)

        isValidStatus = 200 <= login_res.status_code < 300
        self.assertTrue(isValidStatus)

        tokenExists = login_res.data.get("token", False)
        self.assertTrue(tokenExists)

        token = login_res.data["token"]

        logout_req = factory.post("/NycBasics/api/logout/", {"token": token})
        logout_res = logout_view(logout_req)

        isValidStatus = 200 <= logout_res.status_code < 300
        self.assertTrue(isValidStatus)

        # print("res", logout_res.data['status'])
        # print("res", logout_res.status_code)

        self.assertEqual(logout_res.data["status"], "User is logged out.")

    def test_invalid_logout(self):
        logout_view = Logout.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()

        User.objects.create(
            username="user1", email="user1@test.com", password="testpass"
        )

        logout_req = factory.post(
            "/NycBasics/api/logout/", {"token": "bdd32bf7-c076-4674-aa01-5231c587e646"}
        )
        logout_res = logout_view(logout_req)

        # isValidStatus = 200 <= logout_res.status_code < 300
        # self.assertTrue(isValidStatus)

        print("res", logout_res.data)
        # print("res", logout_res.status_code)

        # self.assertEqual(logout_res.data['status'], "User is logged out.")

    def test_water_api(self):
        view = water_List.as_view()
        factory = APIRequestFactory()
        request = factory.get("/NycBasics/api/water/40.0004/73.0004/")

        self.client = APIClient()
        water_model.objects.create(water_longitude=-73.0004, water_latitude=40.0004)
        water_model.objects.create(water_longitude=-73.0003, water_latitude=40.0003)
        water_model.objects.create(
            water_longitude=-73.99765615667471, water_latitude=40.73031601946951
        )
        water_model.objects.create(
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

    def test_bench_api(self):
        view = bench_List.as_view()
        factory = APIRequestFactory()
        request = factory.get("/NycBasics/api/bench/40.0004/73.0004/")

        self.client = APIClient()
        bench_model.objects.create(bench_longitude=-73.0004, bench_latitude=40.0004)
        bench_model.objects.create(bench_longitude=-73.0003, bench_latitude=40.0003)
        bench_model.objects.create(
            bench_longitude=-73.99765615667471, bench_latitude=40.73031601946951
        )
        bench_model.objects.create(
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
        wifi_model.objects.create(wifi_longitude=-73.0004, wifi_latitude=40.0004)
        wifi_model.objects.create(wifi_longitude=-73.0003, wifi_latitude=40.0003)
        wifi_model.objects.create(
            wifi_longitude=-73.97990920046949, wifi_latitude=40.694623000165095
        )
        wifi_model.objects.create(
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
        parking_model.objects.create(
            parking_longitude=-73.0007, parking_latitude=40.0007
        )
        parking_model.objects.create(
            parking_longitude=-73.0008, parking_latitude=40.0008
        )
        parking_model.objects.create(
            parking_longitude=-73.99765615667471, parking_latitude=40.73031601946951
        )
        parking_model.objects.create(
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
        toilet_model.objects.create(toilet_longitude=-73.0009, toilet_latitude=40.0009)
        toilet_model.objects.create(toilet_longitude=-73.0001, toilet_latitude=40.0001)
        toilet_model.objects.create(
            toilet_longitude=-73.99765615667471, toilet_latitude=40.73031601946951
        )
        toilet_model.objects.create(
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
