from rest_framework import generics, permissions, filters
from django.db.models import Count, Avg, Q
from django_filters.rest_framework import DjangoFilterBackend
from .models import Recipe, Tag
from .serializers import RecipeSerializer, TagSerializer
from drf_api.permissions import IsOwnerOrReadOnly

class RecipeList(generics.ListCreateAPIView):
    """
    List all recipes or create a new recipe if logged in.
    """
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Recipe.objects.annotate(
        ratings_average=Avg('ratings__score'),
        reviews_count=Count('reviews', distinct=True),
        ratings_count = Count('ratings', distinct=True),
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'user__followers__follower',  
        'user__following__followed', 
        'user__profile',
        'tags'
    ]
    search_fields = [
        'user__username',
        'title',
        'tags'
    ]
    ordering_fields = [
        'ratings_average',
        'reviews_count',
        'ratings__created_at',
    ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a recipe instance.
    """
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self):
        obj = super().get_object()
        self.check_object_permissions(self.request, obj)
        return obj

class TagList(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer