from django.test import TransactionTestCase
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
from NycBasics.views.userviews import (
    Login,
    Logout,
    User,
    Reset_Password,
    Email_Verification,
    Reset_Password_Verification,
    Record,
    Record_SendEmail,
)
from NycBasics.views.ratingviews import rating_List, Rating_Review
from rest_framework.test import APIClient
from time import sleep
from django.contrib.auth.hashers import make_password

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


class ApiTests(TransactionTestCase):
    def test_addUser(self):
        view = Record.as_view()
        view2 = Record_SendEmail.as_view()
        view3 = Email_Verification.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()

        request = factory.post(
            "/NycBasics/api/addUser/",
            {
                "username": "user1",
                "email": "user1@test.com",
                "password": "testpass",
                "system_otp": "123456",
            },
        )
        response11 = view(request)
        print("")
        print("")
        print("response11.data", response11.data)
        print("")
        print("")
        isValidStatus = 200 <= response11.status_code < 300
        self.assertTrue(isValidStatus)

        request = factory.post(
            "/NycBasics/api/addUser/",
            {
                "username": "user2",
                "email": "user2@test.com",
                "password": "testpass",
                "system_otp": "123456",
            },
        )
        response22 = view(request)
        print("")
        print("")
        print("response22.data", response22.data)
        print("")
        print("")
        isValidStatus = 200 <= response22.status_code < 300
        self.assertTrue(isValidStatus)
        # send email
        request2 = factory.post(
            "/NycBasics/api/addUser_SendEmail/",
            {
                "username": "user1",
                "email": "user1@test.com",
                "password": "testpass",
                "system_otp": "123456",
            },
        )
        response2 = view2(request2)
        sleep(20)
        request3 = factory.get("/NycBasics/api/verification/user1@test.com/123456/")
        response3 = view3(request3, pk1="user1@test.com", pk2="123456")
        isValidStatus = 200 <= response3.status_code < 300
        self.assertTrue(isValidStatus)
        sleep(101)
        print("")
        print("")
        print("response2.data", response2.data)
        print("")
        print("")
        isValidStatus = 200 <= response2.status_code < 300
        self.assertTrue(isValidStatus)
        useruser1 = User.objects.get(username=response11.data["username"])
        print("useruser1.is_email_verified:", useruser1.is_email_verified)
        self.assertEqual(useruser1.is_email_verified, True)

        # email verified false
        request3 = factory.post(
            "/NycBasics/api/addUser_SendEmail/",
            {
                "username": "user2",
                "email": "user2@test.com",
                "password": "testpass",
                "system_otp": "123456",
            },
        )
        response4 = view2(request3)
        sleep(101)
        print("")
        print("")
        print("response4.data", response4.data)
        print("")
        print("")
        isValidStatus = 200 <= response4.status_code < 300
        self.assertTrue(isValidStatus)

    def test_reset_password(self):
        view = Reset_Password.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()

        User.objects.create(
            username="user1",
            email="user1@test.com",
            password="testpass",
            password_otp=123456,
        )

        request = factory.get("/NycBasics/api/reset_password/user1@test.com/123456/")
        response = view(request, pk1="user1@test.com", pk2="123456")

        isValidStatus = 200 <= response.status_code < 300
        self.assertTrue(isValidStatus)

        self.assertEqual(response.data[0]["password_otp"], 123456)

    def test_email_verification(self):
        view = Email_Verification.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()
        User.objects.create(
            username="user1",
            email="user1@test.com",
            password="testpass",
            system_otp=123456,
        )

        request = factory.get("/NycBasics/api/verification/user1@test.com/123456/")
        response = view(request, pk1="user1@test.com", pk2="123456")
        # print("response.data",response.data)

        isValidStatus = 200 <= response.status_code < 300
        self.assertTrue(isValidStatus)

        self.assertEqual(response.data[0]["is_email_verified"], True)

        # otp doesnt match case

        request1 = factory.get("/NycBasics/api/verification/user1@test.com/727722/")
        response1 = view(request1, pk1="user1@test.com", pk2="727722")

        isValidStatus = 200 <= response1.status_code < 300
        self.assertTrue(isValidStatus)

        self.assertEqual(response1.data, [])

    def test_reset_password_verification(self):
        view = Reset_Password_Verification.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()
        User.objects.create(
            username="user1",
            email="user1@test.com",
            password="testpass",
            password_otp=123456,
        )

        request = factory.get(
            "api/reset_password_verification/user1@test.com/123456/newpassword"
        )
        # print("request.data",request.data)
        response = view(request, pk1="user1@test.com", pk2="123456", pk3="newpassword")
        # print("response.data",response.data)

        isValidStatus = 200 <= response.status_code < 300
        self.assertTrue(isValidStatus)

        # self.assertEqual(response.data[0]["password"], "newpassword")

        # otp doesnt match case

        request1 = factory.get(
            "api/reset_password_verification/user1@test.com/727722/newpassword"
        )

        response1 = view(
            request1, pk1="user1@test.com", pk2="727722", pk3="newpassword"
        )

        isValidStatus = 200 <= response1.status_code < 300
        self.assertTrue(isValidStatus)

        self.assertEqual(response1.data, [])

    def test_valid_rating_review(self):
        view = rating_List.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()
        x = User.objects.create(
            username="user1", email="user1@test.com", password="testpass"
        )
        Rating_Review.objects.create(
            user_id=x.id,
            amenity_type="water",
            amenity_id=92,
            rating=3,
            review="This fountain is nice.",
            is_flagged=False,
            is_deleted=False,
            upvotes=0,
            downvotes=0,
        )
        request = factory.get("/NycBasics/api/rating_review/water/92/")
        response = view(request, pk1="water", pk2="92")
        isValidStatus = 200 <= response.status_code < 300
        self.assertTrue(isValidStatus)
        self.assertEqual(response.data[0]["review"], "This fountain is nice.")

    def test_login_logout(self):
        viewLogin = Login.as_view()
        viewLogout = Logout.as_view()
        factory = APIRequestFactory()
        self.client = APIClient()

        User.objects.create(
            username="user1", email="user1@test.com", password=make_password("testpass")
        )

        request = factory.post(
            "/NycBasics/api/login/",
            {"user_id": "user1@test.com", "password": "testpass"},
        )
        response = viewLogin(request)
        isValidStatus = 200 <= response.status_code < 300
        self.assertTrue(isValidStatus)

        tokenExists = response.data.get("token", False)
        self.assertTrue(tokenExists)
        # print("response.data", response.data)
        # print("response.data[\"session_id\"]:",response.data["session_id"])
        self.assertEqual(response.data["session_id"], 1)

        # 2nd session test
        request1 = factory.post(
            "/NycBasics/api/login/",
            {"user_id": "user1@test.com", "password": "testpass"},
        )
        response1 = viewLogin(request1)
        isValidStatus = 200 <= response1.status_code < 300
        self.assertTrue(isValidStatus)

        tokenExists = response1.data.get("token", False)
        self.assertTrue(tokenExists)

        self.assertEqual(response1.data["session_id"], 2)

        # 3rd session test
        request2 = factory.post(
            "/NycBasics/api/login/",
            {"user_id": "user1@test.com", "password": "testpass"},
        )
        response2 = viewLogin(request2)
        isValidStatus = 200 <= response2.status_code < 300
        self.assertTrue(isValidStatus)

        tokenExists = response2.data.get("token", False)
        self.assertTrue(tokenExists)

        self.assertEqual(response2.data["session_id"], 3)

        # 4th session test-out of limit
        request5 = factory.post(
            "/NycBasics/api/login/",
            {"user_id": "user1@test.com", "password": "testpass"},
        )
        response5 = viewLogin(request5)
        isInvalidStatus = 400 <= response5.status_code < 500
        self.assertTrue(isInvalidStatus)

        # logout out of third
        request3 = factory.post(
            "/NycBasics/api/logout/",
            {
                "token": response2.data["token"],
                "session_id": response2.data["session_id"],
            },
        )
        response3 = viewLogout(request3)
        isValidStatus = 200 <= response3.status_code < 300
        # print("response3.data", response3.data)
        self.assertTrue(isValidStatus)

        self.assertEqual(response3.data["status"], "User is logged out.")

        # logout out of second
        request7 = factory.post(
            "/NycBasics/api/logout/",
            {
                "token": response1.data["token"],
                "session_id": response1.data["session_id"],
            },
        )
        response7 = viewLogout(request7)
        isValidStatus = 200 <= response7.status_code < 300
        # print("response7.data", response7.data)
        self.assertTrue(isValidStatus)

        self.assertEqual(response7.data["status"], "User is logged out.")

        # logout out of first
        request8 = factory.post(
            "/NycBasics/api/logout/",
            {
                "token": response.data["token"],
                "session_id": response.data["session_id"],
            },
        )
        response8 = viewLogout(request8)
        isValidStatus = 200 <= response8.status_code < 300
        # print("response8.data", response8.data)
        self.assertTrue(isValidStatus)

        self.assertEqual(response8.data["status"], "User is logged out.")

    """
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

        isInvalidStatus = 400 <= logout_res.status_code < 500
        self.assertTrue(isInvalidStatus)

        # print("res", logout_res.data)
        # print("res", logout_res.status_code)

        self.assertEqual(
            logout_res.data["non_field_errors"][0],
            "User matching query does not exist.",
        )
    """

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
