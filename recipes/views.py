from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Recipe
from .models import Ingredient
from .serializers import RecipeSerializer
from .serializers import IngredientSerializer
from drf_api.permissions import IsOwnerOrReadOnly

class RecipeList(APIView):
   
    def get(self, request):
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True, context={'request': request})
        return Response(serializer.data)


class RecipeDetail(APIView):
   
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self, pk):
        try:
            recipe = Recipe.objects.get(pk=pk)
            self.check_object_permissions(self.request, recipe)
            return recipe
        except Recipe.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        recipe = self.get_object(pk)
        serializer = RecipeSerializer(recipe, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        recipe = self.get_object(pk)
        serializer = RecipeSerializer(recipe, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        recipe = self.get_object(pk)
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CreateIngredient(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
       
        ingredients = Ingredient.objects.all()
        serializer = IngredientSerializer(ingredients, many=True)  
        return Response(serializer.data)
    
    def post(self, request, format=None):
        existing_ingredient = Ingredient.objects.filter(name__iexact=request.data.get('name')).first()
        if existing_ingredient:
            return Response({'message': 'Ingredient already exists!'}, status=status.HTTP_409_CONFLICT)
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)