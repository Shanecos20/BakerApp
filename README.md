# Bakehouse Bakery App

![Node.js](https://img.shields.io/badge/node.js-14.17.0-green)
![React](https://img.shields.io/badge/react-17.0.2-blue)

> **Author:** Shane Costello  
> **Student ID:** G00391599  
> **Course:** Computing & Digital Media  
> **Instructor:** Dr. Martin Kenirons | Data Representation & Querying  

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
- [Contributing](#contributing)

## Description

Bakehouse Bakery App is a comprehensive recipe management application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It offers full CRUD (Create, Read, Update, Delete) functionality, allowing users to view, create, edit, delete, and rate recipes. The app is designed to provide a seamless and user-friendly experience for baking enthusiasts to manage and share their favorite recipes.

## Features

- **User Authentication:** Secure login and registration using JWT.
- **Recipe Management:** Create, view, edit, delete, and update recipes.
- **Recipe Rating:** Authenticated users can rate recipes out of 5 stars.
- **Search & Filter:** Easily search and filter recipes by name, category, or ingredients.
- **Responsive Design:** Optimized for all devices with a visually appealing interface.
- **Featured Recipes:** Highlighted recipes based on popularity.
- **Dynamic Instructions:** Add detailed recipe instructions with optional images.

## Technology Stack

### Frontend

- **React:** JavaScript library for building user interfaces.
- **React Router:** Handles client-side routing and navigation.
- **React-Bootstrap:** Integrates Bootstrap components with React for responsive design.
- **Axios:** Makes HTTP requests to the backend API.
- **LocalStorage:** Stores user authentication tokens and manages sessions.

### Backend

- **Node.js:** JavaScript runtime for building the server.
- **Express.js:** Web framework for handling routes and middleware.
- **MongoDB:** NoSQL database for storing user and recipe data.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens):** Handles user authentication and authorization.
- **Cors:** Enables Cross-Origin Resource Sharing.
- **Body-Parser:** Parses incoming request bodies in middleware.

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

This command starts the backend server on [http://localhost:4000](http://localhost:4000).

### User Guide

#### Register an Account

1. Navigate to the **Register** page.
2. Fill in your name, email, and password.
3. Upon successful registration, you'll be logged in automatically.

#### Login

- If you already have an account, go to the **Login** page.
- Enter your email and password to log in.

#### Explore Recipes

- Browse all available recipes on the **All Recipes** page.
- Use the search bar and filters to find recipes by name, category, or ingredients.
- View detailed instructions and images by clicking on a recipe.

#### Manage Recipes

- **Create Recipe:** Click on **Add Recipe** in the navbar to create a new recipe.
- **Edit/Delete Recipe:** If you're the owner of a recipe, you'll see **Edit** and **Delete** options on the recipe card.

#### Rate Recipes

- Authenticated users can rate recipes they did not create.
- Click on the stars to rate a recipe out of 5.

#### Logout

- Click on your profile icon in the navbar and select **Log Out** to end your session.

## Screenshots

![image](https://github.com/user-attachments/assets/bc8db69a-ef66-43cb-9193-df96ee36f270)
![image](https://github.com/user-attachments/assets/0dd5256e-5cc4-4d73-9ff0-33995a900187)
![image](https://github.com/user-attachments/assets/f48ccde5-5793-476b-8528-afef730f4c61)
![image](https://github.com/user-attachments/assets/eb383b5d-e6b5-4a2d-9950-73e7cd30cc8f)
![image](https://github.com/user-attachments/assets/80f85e5c-2a6d-4315-9af6-1dc921bc534c)
![image](https://github.com/user-attachments/assets/54057837-4938-4756-86af-35ff00126232)
![image](https://github.com/user-attachments/assets/e8595404-5cd2-421b-ac75-e8b63177fe40)




