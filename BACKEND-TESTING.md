## Automated Tests

Numerous unit tests were devised for the recipes endpoint, located in `recipes/tests.py`. All tests successfully passed, ensuring robust functionality:

1. **Test User Listing of Recipes**: Confirmed that authenticated users can list all recipes they have access to. This was validated by creating a user and a recipe, then making a GET request to the recipes endpoint.
   
2. **Test Creation of Recipes by Logged-In User**: Verified that logged-in users can create new recipes. After logging in a test user, a POST request was made to create a recipe, and the existence of this recipe in the database was confirmed.

3. **Test Restriction on Recipe Creation by Unauthenticated Users**: Ensured that unauthenticated users are prevented from creating recipes. A POST request by an unauthenticated user resulted in a HTTP 403 Forbidden response.

4. **Test Retrieval of Specific Recipe by Valid ID**: Validated that a logged-in user can retrieve a specific recipe by its ID. The test checked the correct retrieval of recipe details via a GET request.

5. **Test Handling of Invalid Recipe ID**: Ensured robust error handling when a non-existent recipe ID is requested. The test confirmed that attempting to retrieve a recipe with an invalid ID results in a HTTP 404 Not Found response.

6. **Test Update Capability for Owned Recipes**: Checked that users can update recipes they own. A user authenticated and updated a recipe they created, and the test verified the changes were accurately reflected.

7. **Test Restriction on Updating Non-Owned Recipes**: Asserted that users cannot update recipes they do not own. An attempt by a user to update another user's recipe led to a HTTP 403 Forbidden response.

These tests collectively ensure the integrity and functionality of the recipes management in the application, covering critical aspects from creation, update, to access control.

## Code Quality and Linting

Throughout the development process, all Python files were meticulously checked using the Code Institute Python Linter to ensure adherence to best practices and coding standards. Here's a comprehensive list of the linting results for each app within the project:

- **likes**:
  - `admin.py`: no errors found
  - `models.py`: no errors found
  - `serializers.py`: no errors found
  - `urls.py`: no errors found
  - `views.py`: no errors found

- **followers**:
  - `admin.py`: no errors found
  - `models.py`: no errors found
  - `serializers.py`: no errors found
  - `urls.py`: no errors found
  - `views.py`: no errors found

- **favorites**:
  - `admin.py`: no errors found
  - `models.py`: no errors found
  - `serializers.py`: no errors found
  - `urls.py`: no errors found
  - `views.py`: no errors found

- **drf_api (mainapp)**:
  - `admin.py`: no errors found
  - `permissions.py`: no errors found
  - `serializers.py`: no errors found
  - `urls.py`: no errors found
  - `views.py`: no errors found
  - `settings.py`: lines longer than 80 characters

- **notifications**:
  - `admin.py`: no errors found
  - `models.py`: no errors found
  - `serializers.py`: no errors found
  - `urls.py`: no errors found
  - `views.py`: no errors found

- **profiles**:
  - `admin.py`: no errors found
  - `models.py`: no errors found
  - `serializers.py`: no errors found
  - `urls.py`: no errors found
  - `views.py`: no errors found

- **ratings**:
  - `admin.py`: no errors found
  - `models.py`: no errors found
  - `serializers.py`: no errors found
  - `urls.py`: no errors found
  - `views.py`: no errors found

- **recipes**:
  - `admin.py`: no errors found
  - `models.py`: no errors found
  - `serializers.py`: no errors found
  - `urls.py`: no errors found
  - `views.py`: no errors found

- **reviews**:
  - `admin.py`: no errors found
  - `models.py`: no errors found
  - `serializers.py`: no errors found
  - `urls.py`: no errors found
  - `views.py`: no errors found

This approach to code quality has ensured that the entire application adheres to the highest standards of Python coding practices, with only a minor issue in the main app's `settings.py` file related to line length.

## API Manual Testing

### Methodology
The testing methodology for the Recipe Domain was carefully structured to ensure that all aspects of the application behaved as expected. This included a comprehensive series of manual tests focusing on the application's core functionalities, which are pivotal to the user experience. These functionalities include creating recipes, rating them, marking them as favorites, reviewing recipes with optional images, following users, and managing notifications.

Given the absence of multiple user roles, the tests primarily differentiated between actions performed by the recipe/review owner and other authenticated users. The default Django admin superuser managed administrative tasks without any special roles affecting the main application.

The tests aimed to validate the following key behaviors:
- **Recipe Ownership**: Only the creator of a recipe can edit or delete it.
- **Review Management**: Only the author of a review can edit or delete it, and reviews can include images.
- **User Interactions**: Users can follow others, like or dislike reviews, and receive notifications when their recipes are reviewed.
- **Notifications**: Users can delete a notification or mark it as read, ensuring that the notification system supports user engagement without becoming intrusive.
- **Profile Updates**: Users can update their profile information, including their bio, username, and password.

### Testing Approach
All tests were conducted using the Django Rest Framework HTML interface on a test server. This approach allowed for direct interaction with the API endpoints in a controlled environment, ensuring that each function could be tested in isolation and in combination.

### Special Considerations
- **Image Handling**: Tests verified that images could be added, updated, or removed both in recipes and reviews, checking for any issues in file handling or display.
- **Security and Privacy**: Ensuring that users could only access and modify their own content, testing the privacy and security configurations extensively.
- **Performance**: Observing the response times and stability during operations involving complex queries or large image files to ensure the application's performance remained robust.

This hands-on testing approach ensured that the Recipe Domain API was thoroughly evaluated, simulating a variety of user interactions to validate functionality, security, and performance before deployment.


## Manual Tests

## Manual Tests for Recipe and Reviews Application

| Test ID | Test Description                                                        | Expected Outcome                                                   | Result  |
|---------|-------------------------------------------------------------------------|--------------------------------------------------------------------|---------|
| R1      | Unauthenticated user tries to list recipes.                             | Should receive HTTP 200 OK and list of recipes.                                 | PASS    |
| R2      | Authenticated user lists recipes.                                       | Should receive HTTP 200 OK and list of recipes.                    | PASS    |
| R3      | Authenticated user creates a recipe without image.                      | Should successfully create a recipe and return HTTP 201 Created.   | PASS    |
| R4      | Authenticated user tries to create a recipe with an image over 4MB.     | Should return HTTP 400 with an image size error message.           | PASS    |
| R5      | Authenticated user updates a recipe they own.                           | Should update the recipe and return HTTP 200 OK.                   | PASS    |
| R6      | Authenticated user tries to update a recipe they don't own.             | Should receive HTTP 403 Forbidden.                                 | PASS    |
| R7      | Authenticated user deletes a recipe they own.                           | Should delete the recipe and return HTTP 204 No Content.           | PASS    |
| R8      | Authenticated user tries to delete a recipe they don't own.             | Should receive HTTP 403 Forbidden.                                 | PASS    |
| R9      | Authenticated user lists most favorited recipes.                        | Should receive HTTP 200 OK with recipes sorted by favorites.       | PASS    |
| R10     | Unauthenticated user tries to list most favorited recipes.               | Should receive HTTP                                  |     |

| Test ID | Test Description                                                    | Expected Outcome                                               | Result  |
|---------|---------------------------------------------------------------------|----------------------------------------------------------------|---------|
| RV1     | Authenticated user creates a review for a recipe.                        | Should successfully create a review and return HTTP 201 Created.   | PASS    |
| RV2     | Authenticated user creates a review with an image over 4MB.              | Should return HTTP 400 with an image size error message.           | PASS    |
| RV3     | Authenticated user updates a review they own.                            | Should update the review and return HTTP 200 OK.                   | PASS    |
| RV4     | Authenticated user tries to update a review they don't own.              | Should receive HTTP 403 Forbidden.                                 | PASS    |
| RV5     | Authenticated user deletes a review they own.                            | Should delete the review and return HTTP 204 No Content.           | PASS    |
| RV6     | Authenticated user tries to delete a review they don't own.              | Should receive HTTP 403 Forbidden.                                 | PASS    |
| RV7     | User likes a review for the first time.                                  | Should increment like count and return HTTP 201 Created.           | PASS    |
| RV8     | User dislikes a review they previously liked.                            | Should update like status and adjust counts, returning HTTP 200 OK.| PASS    |

| Test ID | Test Description                                                    | Expected Outcome                                               | Result  |
|---------|---------------------------------------------------------------------|----------------------------------------------------------------|---------|
| RA1     | Unauthenticated user tries to list ratings.                         | Should receive HTTP 200 OK with ratings list.                  | PASS    |
| RA2     | Authenticated user lists ratings.                                   | Should receive HTTP 200 OK with list of ratings.               | PASS    |
| RA3     | Authenticated user creates a rating for a recipe.                   | Should successfully create a rating and return HTTP 201 Created.| PASS    |
| RA4     | Authenticated user tries to create a duplicate rating for a recipe. | Should return HTTP 400 with a duplicate rating error message.  | PASS    |
| RA5     | Authenticated user updates a rating they own.                       | Should update the rating and return HTTP 200 OK.               | PASS    |
| RA6     | Authenticated user tries to update a rating they don't own.         | Should receive HTTP 403 Forbidden.                             | PASS    |
| RA7     | Authenticated user deletes a rating they own.                       | Should delete the rating and return HTTP 204 No Content.       | PASS    |
| RA8     | Authenticated user tries to delete a rating they don't own.         | Should receive HTTP 403 Forbidden.                             | PASS    |

| Test ID | Test Description                                         | Expected Outcome                                               | Result  |
|---------|----------------------------------------------------------|----------------------------------------------------------------|---------|
| PR1     | Unauthenticated user tries to list profiles.  | Should receive HTTP 200 OK with profiles list.          | PASS    |
| PR2     | Authenticated user views their own profile detail.   | Should receive HTTP 200 OK with their profile details.    | PASS    |
| PR3     | Authenticated user updates their own profile.   | Should update the profile and return HTTP 200 OK.       | PASS    |
| PR4     | Authenticated user tries to update another user's profile| Should receive HTTP 403 Forbidden.           | PASS    |
| PR5     | Authenticated user views profiles they follow.      | Should receive HTTP 200 OK with followed profiles list.        | PASS    |


| Test ID | Test Description                                                   | Expected Outcome                                             | Result  |
|---------|--------------------------------------------------------------------|--------------------------------------------------------------|---------|
| N1      | Authenticated user receives a notification for a review left by someoneelse on a recipe they own   | Should receive the notification and return HTTP 201 Created. | PASS    |
| N2      | Authenticated user tries to access another user's notification     | Should receive HTTP 403 Forbidden.                           | PASS    |
| N3      | Authenticated user marks a notification as read.                   | Should mark the notification as read and return HTTP 200 OK. | PASS    |
| N4      | Authenticated user deletes a notification they own.                | Should delete the notification and return HTTP 204 No Content| PASS    |

| Test ID | Test Description                                               | Expected Outcome                                                 | Result  |
|---------|----------------------------------------------------------------|------------------------------------------------------------------|---------|
| L1      | Unauthenticated user tries to list likes.                      | Should receive HTTP 200 OK with likes list.                      | PASS    |
| L2      | Authenticated user lists likes.                                | Should receive HTTP 200 OK with list of likes.                   | PASS    |
| L3      | Authenticated user creates a like for a review.                | Should successfully create a like and return HTTP 201 Created.   | PASS    |
| L4      | Authenticated user tries to create a duplicate like for a review.| Should return HTTP 400 with a duplicate like error message.    | PASS    |
| L5      | Authenticated user updates a like they own.                    | Should update the like status and return HTTP 200 OK.            | PASS    |
| L6      | Authenticated user tries to update a like they don't own.      | Should receive HTTP 403 Forbidden.                               | PASS    |
| L7      | Authenticated user deletes a like they own.                    | Should delete the like and return HTTP 204 No Content.           | PASS    |
| L8      | Authenticated user tries to delete a like they don't own.      | Should receive HTTP 403 Forbidden.                               | PASS    |
| L9      | Unauthenticated user tries to create a likes for a review.     | Should receive HTTP 403 Forbidden.                               | PASS    |

| Test ID | Test Description                                               | Expected Outcome                                                 | Result  |
|---------|----------------------------------------------------------------|------------------------------------------------------------------|---------|
| F1      | Unauthenticated user tries to list follows.                    | Should receive HTTP 200 OK with follows list.                    | PASS    |
| F2      | Authenticated user lists follows.                              | Should receive HTTP 200 OK with list of follows.                 | PASS    |
| F3      | Authenticated user creates a follow relationship.              | Should successfully create a follow and return HTTP 201 Created. | PASS    |
| F4      | Authenticated user tries to follow themselves.                 | Should return HTTP 400 with an error message.                    | PASS    |
| F5      | Authenticated user updates a follow they own.                  | Should update the notify_on_new_post and return HTTP 200 OK.     | PASS    |
| F6      | Authenticated user tries to update a follow they don't own.    | Should receive HTTP 403 Forbidden.                               | PASS    |
| F7      | Authenticated user deletes a follow they own.                  | Should delete the follow and return HTTP 204 No Content.         | PASS    |
| F8      | Authenticated user tries to delete a follow they don't own.    | Should receive HTTP 403 Forbidden.                               | PASS    |
| F9      | Unauthenticated user tries to creates a follow relationship.   | Should receive HTTP 403 Forbidden.                               | PASS    |

| Test ID | Test Description                                                 | Expected Outcome                                                 | Result  |
|---------|------------------------------------------------------------------|------------------------------------------------------------------|---------|
| FA1     | Unauthenticated user tries to list most favorited recipes.       | Should receive HTTP 200 OK with favorites list.                  | PASS    |
| FA2     | Authenticated user lists favorites.                              | Should receive HTTP 200 OK with list of favorites.               | PASS    |
| FA3     | Authenticated user creates a favorite for a recipe.              | Should successfully create a favorite and return HTTP 201 Created.| PASS    |
| FA4     | Authenticated user tries to create a duplicate favorite for a recipe.| Should return HTTP 400 with a duplicate favorite error message. | PASS    |
| FA5     | Authenticated user deletes a favorite they own.                  | Should delete the favorite and return HTTP 204 No Content.       | PASS    |
| FA6     | Authenticated user tries to delete a favorite they don't own.    | Should receive HTTP 403 Forbidden.                               | PASS    |
