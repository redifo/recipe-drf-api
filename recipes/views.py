from rest_framework import generics, permissions
from .models import Recipe
from .serializers import RecipeSerializer
from drf_api.permissions import IsOwnerOrReadOnly

class RecipeList(generics.ListCreateAPIView):
    """
    List all recipes or create a new recipe if logged in.
    """
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
