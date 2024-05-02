from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from ratings.models import Rating
from ratings.serializers import RatingSerializer

class RatingList(generics.ListCreateAPIView):
    """
    List ratings or create a rating if logged in.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()

    def perform_create(self, serializer):
        
        serializer.save(user=self.request.user) 

class RatingDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a rating and update or delete it by id if you own it.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()
    
    #https://www.django-rest-framework.org/api-guide/generic-views/
    def get_serializer_context(self):
        """
        Pass additional context to the serializer to handle the initial rating.
        """
        context = super().get_serializer_context()
        context.update({
            'request': self.request
        })
        return context

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)