from rest_framework import generics, permissions, filters
from .models import Favorite
from .serializers import FavoriteSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend


class FavoriteList(generics.ListCreateAPIView):
    """
    List favorites or create a favorite if logged in.
    """
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['user__username', 'recipe__id']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FavoriteDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a like or delete it by id if you own it.
    """
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [IsOwnerOrReadOnly]
