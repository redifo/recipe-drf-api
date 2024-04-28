from django.urls import path
from .views import RecipeDetail, RecipeList, TagList

urlpatterns = [
    path('recipes/', RecipeList.as_view(), name='recipe-list'),
    path('recipes/<int:pk>/', RecipeDetail.as_view(), name='recipe-detail'),
    path('tags/', TagList.as_view(), name='tag-list'),

]
