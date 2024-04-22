from django.db.models import Count
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Profile
from .serializers import ProfileSerializer
from drf_api.permissions import IsOwnerOrReadOnly

class ProfileList(generics.ListAPIView):
    """
    List all profiles, with counts for posts, followers, and following.
    """
    queryset = Profile.objects.annotate(
        recipes_count=Count('user__recipes', distinct=True), 
        followers_count=Count('user__followers', distinct=True),  
        following_count=Count('user__following', distinct=True)  
    ).order_by('-created_at')
    serializer_class = ProfileSerializer
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['user__username']
    ordering_fields = ['created_at', 'recipes_count', 'followers_count', 'following_count']

class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile if you're the owner, including count details.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.annotate(
        recipes_count=Count('user__recipes', distinct=True),
        followers_count=Count('user__followers', distinct=True), 
        following_count=Count('user__following', distinct=True)  
    )
    serializer_class = ProfileSerializer
