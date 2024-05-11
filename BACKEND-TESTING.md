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
