from django.urls import path
from .views import FavoriteList, FavoriteDetail

urlpatterns = [
    path('favorites/', FavoriteList.as_view(), name='like-list'),
    path('favorites/<int:pk>/', FavoriteDetail.as_view(), name='like-detail'),
]
