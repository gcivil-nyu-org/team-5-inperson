from rest_framework import generics
from ..models import bookmark_model, User, Rating_Review
from ..serializers import (
    bookmark_modelSerializer,
    rating_modelSerializer
)

class User_Bookmarks(generics.ListAPIView):
    def get_queryset(self):
        pk = self.kwargs["pk"]
        #username
        
        bookmark_all = bookmark_model.objects.all()
        user_all = User.objects.all()

        relevant_user = user_all.filter(
            username=pk,
        )
        # print("relevant_user[0].id: ",relevant_user[0].id)
        u_id = relevant_user[0].id

        relevant_bookmarks = bookmark_all.filter(
            user_id=u_id,            
        )

        return relevant_bookmarks

    serializer_class = bookmark_modelSerializer


class User_Reviews(generics.ListAPIView):
    def get_queryset(self):
        pk = self.kwargs["pk"]
        #username
        
        review_all = Rating_Review.objects.all()
        user_all = User.objects.all()

        relevant_user = user_all.filter(
            username=pk,
        )
        # print("relevant_user[0].id: ",relevant_user[0].id)
        u_id = relevant_user[0].id

        relevant_reviews = review_all.filter(
            user_id=u_id,            
        )

        return relevant_reviews


    serializer_class = rating_modelSerializer