# Recipe Domain Backend 
## Project Goals

## Table of contents
- [Recipe Domain Backend](#recipe-domain-backend)
  * [Project Goals](#project-goals)
  * [Table of contents](#table-of-contents)
  * [Planning](#planning)
    + [Data models](#data-models)
  * [API endpoints](#api-endpoints)
  * [Frameworks, libraries and dependencies](#frameworks--libraries-and-dependencies)
  * [Resolved bugs](#resolved-bugs)
  * [Unresolved bugs](#unresolved-bugs)
  * [Credits](#credits)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Planning
### Data models
## API endpoints

| Resources     | Methods | PROFILES (name, bio, avatar, etc.) | RECIPES (title, ingredients, instructions, etc.) | REVIEWS (text, images, likes) | RATINGS (score) | FOLLOWS (follower_id, followed_id) | FAVORITES (recipe_id) | LIKES (review_id, is_like) | NOTIFICATIONS (type, sender, recipient) |
|---------------|---------|------------------------------------|-------------------------------------------------|-------------------------------|-----------------|-----------------------------------|----------------------|--------------------------|----------------------------------------|
| create / POST | `POST`  | ✖                                 | ✔                                               | ✔                             | ✔               | ✔                                 | ✔                    | ✔                        | ✔                                      |
| retrieve / GET | `GET`  | ✔                                 | ✔                                               | ✔                             | ✔               | ✔                                 | ✔                    | ✔                        | ✔                                      |
| update / PUT  | `PUT`   | ✔                                 | ✔ (own recipes)                                 | ✔ (own reviews)               | ✔ (own ratings) | ✖                                 | ✖                    | ✔ (own likes)            | ✖                                      |
| destroy / DELETE | `DELETE` | ✖                             | ✔ (own recipes)                                 | ✔ (own reviews)               | ✔ (own ratings) | ✔ (own follows)                   | ✔ (own favorites)     | ✔ (own likes)            | ✔ (own notifications)                  |
| list / GET    | `GET`   | ✔                                 | ✔                                               | ✔                             | ✔               | ✔                                 | ✔                    | ✔                        | ✔                                      |
| search / GET  | `GET`   | ✖                                 | ✔                                               | ✖                             | ✖               | ✖                                 | ✖                    | ✖                        | ✖                                      |

## Authentication Endpoints

| Authentication | registration (POST) | login (POST) | logout (POST) | user (GET) | refresh token (POST) | change password (POST) |
|----------------|---------------------|--------------|---------------|------------|----------------------|-----------------------|
| endpoint       | `/api/auth/registration/` | `/api/auth/login/` | `/api/auth/logout/` | `/api/auth/user/` | `/api/auth/token/refresh/` | `/api/auth/password/change/` |
| expected value | username, email, password1, password2 | username, password | Token | Token | Refresh Token | Old Password, New Password1, New Password2 |

## Frameworks, Libraries, and Dependencies

- **Django Rest Framework**: Serves as the foundation for creating RESTful APIs, handling client-server interactions efficiently. Utilized for all data management and CRUD operations within the app.
- **JWT Authentication**: Ensures secure and scalable user authentication using JSON Web Tokens, integrated through `dj_rest_auth` and Django's authentication systems.
- **Cloudinary**: Used for cloud-based image storage, simplifying the management of user-uploaded images like profile pictures and recipe photos. Configured through `cloudinary_storage` to handle media files.
- **Django Filters**: Implemented for advanced querying capabilities, allowing users to filter recipes and other content based on various criteria. Enabled in the app through `django_filters`.
- **WhiteNoise**: Facilitates efficient static file serving in Django applications, especially when deployed. Integrated to manage static files seamlessly.
- **Django Rest Auth & Allauth**: Provide comprehensive user authentication, including registration and login functionalities, connected with `dj_rest_auth` and `allauth`.
- **CORS Headers**: Configured to allow resource sharing between the frontend and backend, supporting cross-origin requests. Essential for interactions between different domains during development and production.

### Database
- **PostgreSQL**: Chosen for its robustness and scalability in storing and managing user and recipe data. Connected through `dj_database_url` to parse database URLs.

### Key Settings and Configurations
- `SECRET_KEY`, `DEBUG`, and `ALLOWED_HOSTS` are standard Django settings adjusted for security and operational context.
- `REST_FRAMEWORK` configuration ensures JWT is used for authentication, with custom pagination and rendering settings.
- `CORS_ALLOWED_ORIGINS` and `CORS_ALLOW_CREDENTIALS` are set to ensure the frontend can interact with the API without CORS issues.
- `INSTALLED_APPS` includes several custom apps like `profiles`, `recipes`, `reviews`, `ratings`, `followers`, `likes`, `notifications`, and `favorites` which define the core functionality of the application.
- Static and media file handling are configured with Django's standard settings and `WhiteNoise` for production readiness.


## Resolved bugs

## Unresolved bugs

## Credits