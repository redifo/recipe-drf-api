from rest_framework import generics, permissions
from .models import Like
from .serializers import LikeSerializer
from drf_api.permissions import IsOwnerOrReadOnly


class LikeList(generics.ListCreateAPIView):
    """
    List likes or create a like if logged in.
    """
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LikeDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update a like or delete it by id if you own it.
    """
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True  # Allow partial updates
        return super().update(request, *args, **kwargs)
