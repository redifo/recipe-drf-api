# Recipe Domain

Recipe Domain is an interactive web application designed to simplify the process of finding, organizing, and sharing culinary recipes. It serves as a central hub for food enthusiasts to discover new recipes, manage their favorites, and share their culinary creations with others. The platform aims to provide a user-friendly environment where users can easily search, filter, and interact with a wide variety of recipes.

## Project Goals
The main goals of Recipe Domain are:
1) Provide a platform for users to easily find recipes based on various criteria such as ingredients or cooking time.
2) Allow users to save and organize their favorite recipes in a personalized way.
3) Enable users to share recipes with others and participate in a community of food enthusiasts.
4) Offer a intuitive user interface that is accessible to users of all tech skill levels.

## Table of Contents
- [Recipe Domain](#recipe-domain)
  * [Project Goals](#project-goals)
  * [Table of Contents](#table-of-contents)
  * [User Stories and Agile Development Methodology](#user-stories-and-agile-development-methodology)
  * [Planning](#planning)
  * [Design](#design)
  * [Features](#features)
  * [Technologies Used](#technologies-used)
  * [Testing](#testing)
  * [Deployment](#deployment)
  * [Credits](#credits)

## User Stories and Agile Development Methodology

In this project, I used an agile development methodology to manage the development process efficiently. I document each feature and task as an issue within GitHub, utilizing the MoSCoW prioritization method. Labels such as 'Must Have', 'Should Have', 'Could Have', and 'Won't Have' help in determining the essential features necessary for a Minimum Viable Product (MVP) and guide the prioritization of enhancements.

I've categorized each issue further as either a 'User Story' or 'Development Task' and assigned a size label from 1 to 5, indicating the complexity and expected effort. This setup provides a clear roadmap and assists in workload management throughout the development phases.

Each issue that has label user story is a user story, which is a description of a feature or functionality that a user would want to have in the application.
Issues can be found at: [GitHub Project Issues](https://github.com/redifo/recipe-domain/issues) 

To systematically track the progress, I've organized the development lifecycle into 8 sprints, represented as milestones on GitHub. These sprints do not have specific due dates but are crucial in grouping and scheduling tasks and user stories, allowing for structured and phased development.

Ideally each sprint should begin with setting up a GitHub project board for that cycle, where tasks are moved from the product backlog into the current iteration based on their assigned priority and relevance to the ongoing sprint goals. However due to frequent user story (issues) changes and cross dependencies between issues and sprints, the sprints were only used as a general guide and the whole project was managed in a signle github project board.

The progress of the project is visually managed using a kanban board within the GitHub project. Tasks are dynamically moved between 'Todo', 'In Progress', and 'Done' columns, reflecting real-time progress and facilitating adjustments as needed.

For a detailed view of the development process, please visit my [GitHub Project Boards](https://github.com/users/redifo/projects/4).

This structured approach not only keeps the project organized but also aligns with agile principles, ensuring flexibility and responsiveness to change throughout the development cycle.

## Planning

### Wireframes

Wireframes were produced based on those user stories that had been identified.

### Data models

Data models were planned alongside the wireframes. These are documented in the read-me for the backend [README-BACKEND.md](https://github.com/redifo/recipe-drf-api/blob/main/README-BACKEND.md).

## Design
### Colours
The primary goal for the color scheme of this project was to create a harmonious and visually appealing interface that promotes user engagement and comfort. The colors chosen reflect a blend of warmth and professionalism, suitable for a broad range of users.

Primary Color (#e4bf8d): This soft, earthy hue is used throughout the site for key UI elements such as buttons, links, and active states. Its warm tone offers a welcoming and friendly vibe that enhances the user experience.
Secondary Color (#e4bf8d): Employed consistently with the primary color, this shade adds a balanced, cohesive look across the site. It's used in less prominent but still significant UI components to maintain visual consistency.
Accent Color (#dd9d72): This slightly darker shade complements the primary and secondary colors by providing a subtle contrast. It's used for specific highlights and to draw attention to particular features, enhancing the site's overall aesthetic.
Follow Button Color (#242a3d): This deep, dark blue offers a striking contrast against the lighter shades of the primary and secondary colors. Used primarily for the 'follow' button, it stands out to encourage user interaction.
Active Focus Color (#cf8d12): A bold, vibrant orange, this color is used to indicate active or focused states on certain buttons and icons. Its bright nature ensures that these elements catch the user's eye, guiding their navigation through the site.
Base-200 (#ebebeb) and Base-300 (#d6d6d6): These slightly darker shades are used for secondary backgrounds and elements, providing depth and visual hierarchy without overwhelming the primary colors.
### Typography
For the typography, the choice of fonts and their application was aimed at complementing the color scheme and enhancing the site's readability and accessibility.

Font Family ("Merriweather Sans", sans-serif): This font was selected for its modern and friendly appearance, which aligns well with the overall aesthetic of the site. It provides excellent readability across various devices and screen sizes.
Font Optical Sizing (auto): Ensuring that the text is displayed optimally at different scales, this setting adjusts the font's weight and spacing based on the user's device or display settings.

## Features
### Essential Features
- **Recipe Search**: Users can search for recipes based on keywords, ingredients, or tags.
- **Filter Recipes**: Users can filter recipes based on criteria such as cook time, and tags.
- **Recipe Management**: Users can create, edit, and delete their own recipes.
- **User Profiles**: Users can create profiles to manage their recipes and preferences.
- **Social Interaction**: Users can share recipes and interact with other users.

### Future Enhancements
- Integration with grocery shopping lists.
- Meal planning tools.
- Advanced dietary filtering, including allergen-free options.
- Recipe recommendations based on user preferences and past activities.

## Technologies Used
- **Frontend**: React, Bootstrap for responsive design.
- **Backend**: Django Rest Framework for handling API requests.
- **Database**: PostgreSQL for storing user and recipe data.
- **Additional Libraries**: 

## Testing

## Deployment
Recipe Domain is deployed on 

## Credits
- **Code**: 
- **Media**: 
- **Acknowledgements**: 
