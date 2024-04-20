from django.contrib.auth.models import User
from .models import Recipe
from rest_framework import status
from rest_framework.test import APITestCase

class RecipeListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='testuser', password='12345')
        
    
    def test_can_list_recipes(self):
        testuser = User.objects.get(username = 'testuser')
        Recipe.objects.create(user=testuser, title='A Recipe', preparation_time=1, cooking_time=2, servings=1)
        response = self.client.get('/recipes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
        print(len(response.data))

    def test_logged_in_user_can_create_recipe(self):
        login = self.client.login(username='testuser', password='12345')
        self.assertTrue(login, "User failed to log in")
        response = self.client.post('/recipes/', {
        'title': 'A Recipe', 
        'description': 'a', 
        'ingredients': 'a', 
        'preparation_time': 1, 
        'cooking_time': 2, 
        'servings': 1,
        'instructions': 'a'
        }, format='json')
        count = Recipe.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_not_loggedin_user_cant_create_recipe(self):
        response = self.client.post('/recipes/', {
        'title': 'A Recipe', 
        'description': 'a', 
        'ingredients': 'a', 
        'preparation_time': 1, 
        'cooking_time': 2, 
        'servings': 1,
        'instructions': 'a'
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)