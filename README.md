# Bakehouse Bakery App
> Shane Costello  
> G00391599 | Computing & Digital Media  
> Dr. Martin Kenirons | Data Representation & Querying


## Description

Recipe app built using the MERN (MongooseDB, Express.js, React.js, Node.js) stack. This app is designed with CRUD functionality. Users can view recipes, edit, delete and update them. 
## Installation

Instructions on how to install and set up the project.

### Clone the repository
```
git clone https://github.com/Shanecos20/BakerApp.git
```

### Navigate to the project directory
```
cd BakerApp
```

### Install dependencies
```
npm install
```

## Usage

Instructions on launching the application and server.

## Start the application
```
npm start
```
This will start the application on port:3000

## Start the server

Open server.js in an integrated terminal
```
nodemon server.js
```
This will start the server on port:4000

### Register an Account:

### Navigate to the Register page.
Fill in your name, email, and password.
Upon successful registration, you'll be logged in automatically.

### Login:
- If you already have an account, go to the Login page.
- Enter your email and password to log in.

### Explore Recipes:
- Browse all available recipes on the All Recipes page.
- Use the search bar and filters to find recipes by name, category, or ingredients.
- View detailed instructions and images by clicking on a recipe.

### Manage Recipes:

- Create Recipe: Click on Add Recipe in the navbar to create a new recipe.
- Edit/Delete Recipe: If you're the owner of a recipe, you'll see Edit and Delete options on the recipe card.
  
### Rate Recipes:
- Authenticated users can rate recipes they did not create.
- Click on the stars to rate a recipe out of 5.

### Logout:
- Click on your profile icon in the navbar and select Log Out to end your session.



## Features

- Login/Register functionality utilising JWT
- Saving recipes
- Recipe filtering and easy searching
- View recipes
- Edit recipes
- Delete recipes
- Update recipes
- Rate recipes out of 5 stars
- Visually appealing and user friendly interface
- Featured recipes based on popularity
- Responsive design
- Dynamic recipe instruction adding with optional visual components

## Technology Stack

### Frontend
- React: JavaScript library for building user interfaces.
- React Router: For client-side routing and navigation.
- React-Bootstrap: Bootstrap components rebuilt for React for responsive design.
- Axios: Promise-based HTTP client for making API requests.
- LocalStorage: For storing user authentication tokens and session management.

### Backend  
- Node.js: JavaScript runtime for building the server.
- Express.js: Web framework for handling routes and middleware.
- MongoDB: NoSQL database for storing user and recipe data.
- Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
- JWT (JSON Web Tokens): For user authentication and authorization.
- Cors: Middleware for enabling CORS (Cross-Origin Resource Sharing).
- Body-Parser: Middleware for parsing incoming request bodies.


###
