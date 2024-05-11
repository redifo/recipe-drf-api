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

## Frameworks, libraries and dependencies

## Resolved bugs

## Unresolved bugs

## Credits