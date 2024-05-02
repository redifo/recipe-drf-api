from rest_framework import generics, permissions, filters
from django.db.models import Count, Q
from django_filters.rest_framework import DjangoFilterBackend
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Review
from .serializers import ReviewSerializer, ReviewDetailSerializer


class ReviewList(generics.ListCreateAPIView):
    """
    List reviews or create a review if logged in.
    """
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Review.objects.annotate(
        likes_count=Count('likes', filter=Q(likes__is_like=True)),
        dislikes_count=Count('likes', filter=Q(likes__is_like=False))
    )
    filter_backends = [
        filters.OrderingFilter,
        DjangoFilterBackend
                       ]
    filterset_fields = ['recipe']
    ordering_fields = [
        'likes_count',
        'dislikes_count',
        'likes__created_at',
        ]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, image=self.request.FILES.get('image'))


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a review, or update or delete it by id if you own it.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = ReviewDetailSerializer
    queryset = Review.objects.all()