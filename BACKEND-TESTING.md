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

