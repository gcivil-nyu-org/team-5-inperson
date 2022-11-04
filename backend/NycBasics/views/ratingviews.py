from ..models import (
    water_model, 
    wifi_model, 
    parking_model, 
    bench_model, 
    toilet_model,
    Rating_Review
)

from ..serializers import (
    water_modelSerializer,
    wifi_modelSerializer,
    parking_modelSerializer,
    bench_modelSerializer, 
    toilet_modelSerializer,
    rating_modelSerializer
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
        )

        return relevant_ratings
        

    serializer_class = rating_modelSerializer
