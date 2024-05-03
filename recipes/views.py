from rest_framework import generics, permissions, filters
from django.db.models import Count, Avg
from django_filters.rest_framework import DjangoFilterBackend, BaseInFilter, FilterSet
from .models import Recipe, Tag
from .serializers import RecipeSerializer, TagSerializer
from drf_api.permissions import IsOwnerOrReadOnly

#https://michaelprather.medium.com/inclusion-and-exclusion-filtering-with-django-rest-framework-and-django-filter-e90a597f2af5
#https://django-filter.readthedocs.io/en/stable/guide/usage.html
class RecipeFilter(FilterSet):
    tags = BaseInFilter(field_name='tags__id', lookup_expr='in')

    class Meta:
        model = Recipe
        fields = []
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
        favorites_count=Count('favorites', distinct=True),
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_class = RecipeFilter
    filterset_fields = [
        'user__followers__follower',  
        'user__following__followed', 
        'user__profile',
        'tags__id',       
    ]
    search_fields = [
        'user__username',
        'tags__name',
        'title',
        'description',
        'ingredients'
    ]
    ordering_fields = [
        'ratings_average',
        'reviews_count',
        'ratings__created_at',
        'favorites_count'
    ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, image=self.request.FILES.get('image'))

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a recipe instance.
    """
    queryset = Recipe.objects.annotate(
        ratings_average=Avg('ratings__score'),
        reviews_count=Count('reviews', distinct=True),
        ratings_count = Count('ratings', distinct=True),
        favorites_count=Count('favorites', distinct=True),
    ).order_by('-created_at')
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self):
        obj = super().get_object()
        self.check_object_permissions(self.request, obj)
        return obj

class TagList(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer