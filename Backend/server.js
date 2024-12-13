// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Initialize Express application
const app = express();
const port = 4000;

// Enable CORS for all routes
app.use(cors());

// Set CORS headers to allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allowed headers
  next();
});

// Configure body parsing for URL-encoded and JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT secret key for token signing and verification
const secret = 'some_secret_key';

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://admin:admin@cluster0.2dzjp.mongodb.net/recipesDB');

// Define User schema with relevant fields
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  icon: String,
  savedRecipes: [String] // Array of recipe IDs saved by the user
});

// Define Recipe schema with relevant fields
const recipeSchema = new mongoose.Schema({
  name: String,
  preparationTime: Number,
  image: String,
  instructions: [{ stepText: String, stepImage: String }], // Array of instruction steps
  ingredients: String,
  category: String,
  owner: String, // ID of the user who owns the recipe
  ratedBy: [{ userId: String, rating: Number }] // Array of ratings by users
});

// Create Mongoose models for users and recipes
const userModel = mongoose.model('usersCollection', userSchema);
const recipeModel = mongoose.model('recipesCollection', recipeSchema);

/**
 * Authentication middleware to protect routes
 * Verifies JWT token and attaches user information to the request object
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token' }); // No token provided

  const token = authHeader.split(' ')[1]; // Extract token from header
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' }); // Invalid token
    req.user = user; // Attach user info to request
    next();
  });
}

// Route to handle user registration
app.post('/api/register', async (req, res) => {
  const { name, email, password, icon } = req.body;
  
  // Check if a user with the given email already exists
  const existing = await userModel.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User exists' });
  
  // Create and save the new user
  const newUser = new userModel({ name, email, password, icon });
  await newUser.save();
  
  // Generate JWT token for the new user
  const token = jwt.sign({ _id: newUser._id }, secret);
  
  // Respond with user details and token
  res.json({ _id: newUser._id, name: newUser.name, email: newUser.email, icon: newUser.icon, token });
});

// Route to handle user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user matching the provided credentials
  const user = await userModel.findOne({ email, password });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
  // Generate JWT token for the authenticated user
  const token = jwt.sign({ _id: user._id }, secret);
  
  // Respond with user details and token
  res.json({ _id: user._id, name: user.name, email: user.email, icon: user.icon, token });
});

// Route to fetch all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipes" });
  }
});

// Route to fetch a specific recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipe" });
  }
});

// Route to update a specific recipe by ID (protected)
app.put('/api/recipes/:id', authMiddleware, async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    
    // Ensure the authenticated user is the owner of the recipe
    if (recipe.owner !== req.user._id) return res.status(403).json({ message: 'Not owner' });
    
    // Update the recipe with new data
    const updatedRecipe = await recipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe" });
  }
});

// Route to create a new recipe (protected)
app.post('/api/recipes', authMiddleware, async (req, res) => {
  try {
    const { name, preparationTime, image, instructions, ingredients, category, owner } = req.body;
    
    // Ensure the authenticated user is the owner of the new recipe
    if (owner !== req.user._id) return res.status(403).json({ message: 'Not owner' });
    
    // Create and save the new recipe
    const newRecipe = new recipeModel({ name, preparationTime, image, instructions, ingredients, category, owner });
    await newRecipe.save();
    
    res.status(201).json({ message: "Recipe Added!", Recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error adding recipe" });
  }
});

// Route to delete a specific recipe by ID (protected)
app.delete('/api/recipes/:id', authMiddleware, async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    
    // Ensure the authenticated user is the owner of the recipe
    if (recipe.owner !== req.user._id) return res.status(403).json({ message: 'Not owner' });
    
    // Delete the recipe
    await recipeModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe' });
  }
});

// Route to fetch authenticated user's data (protected)
app.get('/api/user', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

// Route to fetch authenticated user's saved recipes (protected)
app.get('/api/saved-recipes', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // If no saved recipes, return an empty array
    if (!user.savedRecipes || user.savedRecipes.length === 0) {
      return res.json({ savedRecipes: [] });
    }
    
    // Fetch all recipes that are saved by the user
    const saved = await recipeModel.find({ _id: { $in: user.savedRecipes } });
    res.json({ savedRecipes: saved });
  } catch (err) {
    res.status(500).json({ message: 'Error getting saved recipes' });
  }
});

// Route to toggle saving a recipe for the authenticated user (protected)
app.post('/api/recipes/:id/save', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const recipeId = req.params.id;

    // Check if the recipe is already saved
    const index = user.savedRecipes ? user.savedRecipes.indexOf(recipeId) : -1;

    if (index === -1) {
      // If not saved, add it to savedRecipes
      user.savedRecipes.push(recipeId);
    } else {
      // If already saved, remove it from savedRecipes
      user.savedRecipes.splice(index, 1);
    }

    // Save the updated user document
    await user.save();
    res.json({ message: 'Save state toggled', savedRecipes: user.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error toggling saved state' });
  }
});

// Route to rate a recipe (protected)
app.post('/api/recipes/:id/rate', authMiddleware, async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    
    // Prevent users from rating their own recipes
    if (recipe.owner === req.user._id) return res.status(403).json({ message: 'Cannot rate own recipe' });
    
    const { rating } = req.body;
    
    // Validate rating value
    if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Invalid rating' });

    // Check if the user has already rated the recipe
    const existingRating = recipe.ratedBy.find(r => r.userId === req.user._id);
    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Add a new rating
      recipe.ratedBy.push({ userId: req.user._id, rating });
    }

    // Save the updated recipe document
    await recipe.save();

    res.json({ message: 'Rated', updatedRecipe: recipe });
  } catch (error) {
    res.status(500).json({ message: 'Error rating' });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
