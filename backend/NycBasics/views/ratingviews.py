from ..models import (
    Rating_Review,
    User,
    average_rating_model,
)

from django.db.models import Avg

from ..serializers import (
    rating_modelSerializer,
    avgrating_modelSerializer,
)

from rest_framework import generics


class rating_List(generics.ListAPIView):
    def get_queryset(self):
        pk1 = self.kwargs["pk1"]
        pk2 = int(self.kwargs["pk2"])
        # amenity_type , amenity_id
        rating_all = Rating_Review.objects.all()

        relevant_ratings = rating_all.filter(
            amenity_type=pk1,
            amenity_id=pk2,
        ).select_related("user")

        return relevant_ratings

    serializer_class = rating_modelSerializer


class create_Rating(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = rating_modelSerializer


class average_Rating(generics.ListAPIView):
    def get_queryset(self):
        pk1 = self.kwargs["pk1"]
        # print("pk1",pk1)

        pk2 = int(self.kwargs["pk2"])
        # print("pk1",pk2)
        # amenity_type , amenity_id
        rating_all = Rating_Review.objects.all()

        avg_rating = rating_all.filter(
            amenity_type=pk1,
            amenity_id=pk2,
        ).aggregate(Avg("rating"))

        # print("avg_rating : ",avg_rating)

        int_avg_rating = avg_rating.get("rating__avg")

        # print("int_avg_rating : ",int_avg_rating)
        # average_rating_model.objects.get_or_create(amenity_type=pk1,amenity_id=pk2,average_rating=0)

        average_rating_model.objects.get_or_create(
            amenity_type=pk1, amenity_id=pk2, average_rating=int_avg_rating
        )
        relevant_data = average_rating_model.objects.filter(
            amenity_type=pk1, amenity_id=pk2
        )
        # print("relevant_data : ", relevant_data)

        return relevant_data

    serializer_class = avgrating_modelSerializer
