from rest_framework import generics
from ..models import bookmark_model, User
from ..serializers import (
    bookmark_modelSerializer,
)


class Bookmark(generics.ListAPIView):
    def get_queryset(self):
        pk1 = self.kwargs["pk1"]
        # print("pk1: ",pk1)
        pk2 = self.kwargs["pk2"]
        # print("pk2: ",pk2)
        pk3 = int(self.kwargs["pk3"])
        # print("pk3: ",pk3)
        pk4 = int(self.kwargs["pk4"])
        # print("pk4: ",pk4)
        # user id, amenity_type , amenity_id, is_bookmarked
        bookmark_all = bookmark_model.objects.all()
        user_all = User.objects.all()

        relevant_user = user_all.filter(
            username=pk1,
        )
        # print("relevant_user[0].id: ",relevant_user[0].id)
        u_id = relevant_user[0].id

        if pk4 == 1:
            is_bookmarked = True
        else:
            is_bookmarked = False

        relevant_bookmark = bookmark_model.objects.get_or_create(
            user_id=u_id,
            amenity_type=pk2,
            amenity_id=pk3,
        )
        # print("relevant_bookmark :",relevant_bookmark)
        # print("relevant_bookmark[0] :",relevant_bookmark[0])
        # print("relevant_bookmark[0].user_id :",relevant_bookmark[0].user_id)
        # print("relevant_bookmark[0].amenity_type :",relevant_bookmark[0].amenity_type)
        # print("relevant_bookmark[0].amenity_id :",relevant_bookmark[0].amenity_id)
        # print("relevant_bookmark[0].is_bookmarked before:",relevant_bookmark[0].is_bookmarked)
        relevant_bookmark[0].is_bookmarked = is_bookmarked
        # print("relevant_bookmark[0].is_bookmarked after:",relevant_bookmark[0].is_bookmarked)
        relevant_bookmark[0].save()

        return bookmark_all

    serializer_class = bookmark_modelSerializer
