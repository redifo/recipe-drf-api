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

class RecipeDetailViewTests(APITestCase):

    def create_user_and_recipe(self):
        user = User.objects.create_user(username='testuser', password='12345')
        recipe = Recipe.objects.create(
            user=user, 
            title='Owned Recipe', 
            description='Sample', 
            ingredients='Ingredients',
            preparation_time=10, 
            cooking_time=20, 
            servings=2,
            instructions='Some instructions'
        )
        return user, recipe

    def test_user_can_retrieve_recipe_with_valid_id(self):
        user, recipe = self.create_user_and_recipe()
        self.client.login(username='testuser', password='12345')
        response = self.client.get(f'/recipes/{recipe.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Owned Recipe')

    def test_user_cannot_retrieve_recipe_with_invalid_id(self):
        self.client.login(username='testuser', password='12345')
        response = self.client.get('/recipes/999/')  
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_update_recipe_they_own(self):
        user, recipe = self.create_user_and_recipe()
        self.client.login(username='testuser', password='12345')
        response = self.client.put(f'/recipes/{recipe.id}/', {
            'title': 'Updated Recipe',
            'description': 'Updated', 
            'ingredients': 'Updated Ingredients',
            'preparation_time': 11,
            'cooking_time': 21,
            'servings': 3,
            'instructions': 'Updated instructions'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        recipe.refresh_from_db()
        self.assertEqual(recipe.title, 'Updated Recipe')

    def test_user_cannot_update_recipe_they_dont_own(self):
        
        owner_user, recipe = self.create_user_and_recipe()
        
        other_user = User.objects.create_user(username='notowner', password='12345')
        self.client.login(username='notowner', password='12345')
        response = self.client.put(f'/recipes/{recipe.id}/', {
            'title': 'Illegally Updated Recipe',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        recipe.refresh_from_db()
        self.assertNotEqual(recipe.title, 'Illegally Updated Recipe')

