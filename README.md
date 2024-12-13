# Bakehouse Bakery App

![Node.js](https://img.shields.io/badge/node.js-14.17.0-green)
![React](https://img.shields.io/badge/react-17.0.2-blue)

> **Author:** Shane Costello  
> **Student ID:** G00391599  
> **Course:** Computing & Digital Media  
> **Lecturer:** Dr. Martin Kenirons | Data Representation & Querying  

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technology Stack](#technology-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
  - [Start the Application](#start-the-application)
  - [Start the Server](#start-the-server)
  - [User Guide](#user-guide)
    - [Register an Account](#register-an-account)
    - [Login](#login)
    - [Explore Recipes](#explore-recipes)
    - [Manage Recipes](#manage-recipes)
    - [Rate Recipes](#rate-recipes)
    - [Logout](#logout)
- [Screenshots](#screenshots)

## Description

This application was developed for the 2024 project for the Data Representation & Querying module for the final year of Computing & Digital Media 2024.  

Bakehouse Bakery App is a full-stack web application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It leverages a robust backend built with Node.js and Express.js to handle API requests, user authentication, and data management, while the frontend utilizes React.js for a dynamic and responsive user interface. The application integrates MongoDB as the NoSQL database, managed through Mongoose for schema definition and data validation. Users can perform comprehensive CRUD (Create, Read, Update, Delete) operations on recipes, ensuring a seamless experience in managing their baking creations. Additionally, the app implements a secure authentication system using JWT (JSON Web Tokens), allowing users to register, log in, and securely interact with the application features.

## Features

- **User Authentication:**
  - **Register & Login:** Secure user registration and login functionalities using JWT for authentication.
  - **Profile Icons:** Automatically assigns a random profile icon to each user upon registration from a predefined set of Imgur-hosted images.
  - **Protected Routes:** Ensures that only authenticated users can access sensitive routes like creating, editing, or deleting recipes.
  - **Session Management:** Utilizes `localStorage` to maintain user sessions and manage authentication tokens.

- **Recipe Management:**
  - **Create Recipes:** Authenticated users can add new recipes with detailed information, including name, preparation time, images, dynamic instructions with optional images, ingredients, and category selection via dropdown.
  - **Edit & Delete Recipes:** Users can edit or delete only the recipes they have created, ensuring data integrity and ownership.
  - **Dynamic Instructions:** Allows users to add multiple instruction steps, each with optional image URLs, providing flexibility in detailing the recipe process.

- **Recipe Exploration:**
  - **Search & Filter:** Advanced search functionality enables users to find recipes by name, category, or specific ingredients.
  - **View Details:** Comprehensive detailed view of each recipe, showcasing all instructions, images, and additional information.
  - **Featured Recipes:** Homepage highlights top-rated recipes based on user ratings, promoting popular and highly-rated baking creations.

- **Rating System:**
  - **Rate Recipes:** Authenticated users can rate recipes on a scale of 1 to 5 stars, contributing to the overall rating of the recipe.
  - **Average Ratings:** Displays the average rating and the number of ratings for each recipe, providing insight into the recipe’s popularity and quality.
  - **Unique Ratings:** Ensures each user can rate a recipe only once and prevents users from rating their own recipes, maintaining fair and unbiased ratings.

- **Responsive Design:**
  - **React-Bootstrap Integration:** Utilizes React-Bootstrap components to ensure the application is mobile-friendly and provides a consistent, visually appealing interface across all devices.

- **Security Enhancements:**
  - **JWT Authentication:** Implements secure token-based authentication to protect user data and manage access control.
  - **CORS Configuration:** Configured to allow secure cross-origin requests between the frontend and backend servers.

## Technology Stack

### Frontend

- **React:** A powerful JavaScript library for building interactive and dynamic user interfaces through reusable components.
- **React Router:** Facilitates client-side routing, enabling seamless navigation between different views without full page reloads.
- **React-Bootstrap:** Integrates Bootstrap’s responsive design components with React, allowing for rapid UI development with consistent styling.
- **Axios:** A promise-based HTTP client used for making asynchronous API requests to the backend server, handling data fetching and submission.
- **LocalStorage:** Utilized for storing user authentication tokens (JWT) and managing user sessions, ensuring persistent login states across browser sessions.

### Backend

- **Node.js:** A JavaScript runtime environment that allows for building scalable and high-performance server-side applications.
- **Express.js:** A minimalist web framework for Node.js, simplifying the creation of robust API endpoints and handling middleware functionalities.
- **MongoDB:** A NoSQL database used for storing and managing user and recipe data, offering flexibility in data modeling.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js, providing schema-based solutions for modeling application data and enforcing data validation.
- **JWT (JSON Web Tokens):** Employed for secure user authentication and authorization, enabling stateless session management.
- **Cors:** Middleware to enable Cross-Origin Resource Sharing, allowing the frontend application to communicate with the backend server.
- **Body-Parser:** Middleware for parsing incoming request bodies in a middleware before your handlers, available under the `req.body` property.

## Installation

Follow these steps to set up and run the Bakehouse Bakery App locally.

### Clone the Repository

```
git clone https://github.com/Shanecos20/BakerApp.git
```

### Navigate to the Project Directory

```
cd BakerApp
```

### Install Dependencies

```
npm install
```

## Usage

Follow these instructions to launch the application and server.

### Start the Application

```
npm start
```

This command starts the React application on [http://localhost:3000](http://localhost:3000).

### Start the Server

Open `server.js` in an integrated terminal and run:

```
nodemon server.js
```


This command starts the Express.js backend server, listening on [http://localhost:4000](http://localhost:4000). `nodemon` is used for automatically restarting the server upon detecting file changes, streamlining the development process.

### User Guide

#### Register an Account

1. Navigate to the **Register** page via the navbar.
2. Fill in your name, email, and password.
3. Upon successful registration, a JWT token is generated and stored in `localStorage`, automatically logging you in.

#### Login

- If you already have an account, go to the **Login** page.
- Enter your email and password to authenticate.
- Successful login stores the JWT token in `localStorage`, maintaining your authenticated session.

#### Explore Recipes

- Browse all available recipes on the **All Recipes** page.
- Utilize the search bar to find recipes by name.
- Apply filters to narrow down recipes by category or specific ingredients.
- Click on a recipe’s **View Details** button to access comprehensive instructions and images.

#### Manage Recipes

- **Create Recipe:** Click on **Add Recipe** in the navbar to access the recipe creation form. Only available to authenticated users.
- **Edit/Delete Recipe:** If you are the owner of a recipe, **Edit** and **Delete** buttons will appear on the recipe card, allowing you to modify or remove your recipes.

#### Rate Recipes

- Authenticated users can rate recipes they did not create.
- Click on the star icons to submit a rating between 1 and 5 stars.
- The average rating and total number of ratings are dynamically updated based on user inputs.

#### Logout

- Click on your profile icon in the navbar to access the dropdown menu.
- Select **Log Out** to terminate your session, removing the JWT token from `localStorage` and reverting the navbar to display **Login** and **Register** options.

## Screenshots

![image](https://github.com/user-attachments/assets/bc8db69a-ef66-43cb-9193-df96ee36f270)
![image](https://github.com/user-attachments/assets/0dd5256e-5cc4-4d73-9ff0-33995a900187)
![image](https://github.com/user-attachments/assets/f48ccde5-5793-476b-8528-afef730f4c61)
![image](https://github.com/user-attachments/assets/eb383b5d-e6b5-4a2d-9950-73e7cd30cc8f)
![image](https://github.com/user-attachments/assets/80f85e5c-2a6d-4315-9af6-1dc921bc534c)
![image](https://github.com/user-attachments/assets/54057837-4938-4756-86af-35ff00126232)
![image](https://github.com/user-attachments/assets/e8595404-5cd2-421b-ac75-e8b63177fe40)




