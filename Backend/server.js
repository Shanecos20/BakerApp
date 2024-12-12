// server.js (Update rating logic to allow updates and compute averages properly)
// Using ratedBy array as [{userId:String, rating:Number}]
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const secret = 'some_secret_key';

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.2dzjp.mongodb.net/recipesDB');

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  icon:String,
  savedRecipes: [String] // Add this line

});

const recipeSchema = new mongoose.Schema({
  name: String,
  preparationTime: Number,
  image: String,
  instructions: [{ stepText: String, stepImage: String }],
  ingredients: String,
  category: String,
  owner: String,
  ratedBy: [{ userId: String, rating: Number }]
});

const userModel = mongoose.model('usersCollection', userSchema);
const recipeModel = mongoose.model('recipesCollection', recipeSchema);

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if(!authHeader) return res.status(401).json({message:'No token'});
  const token = authHeader.split(' ')[1];
  jwt.verify(token, secret, (err,user)=>{
    if(err) return res.status(403).json({message:'Invalid token'});
    req.user = user;
    next();
  });
}

app.post('/api/register', async (req,res)=>{
  const {name,email,password,icon} = req.body;
  const existing = await userModel.findOne({email});
  if(existing) return res.status(400).json({message:'User exists'});
  const newUser = new userModel({name,email,password,icon});
  await newUser.save();
  const token = jwt.sign({ _id: newUser._id }, secret);
  res.json({ _id:newUser._id, name:newUser.name, email:newUser.email, icon:newUser.icon, token });
});

app.post('/api/login', async (req,res)=>{
  const {email,password} = req.body;
  const user = await userModel.findOne({email,password});
  if(!user) return res.status(400).json({message:'Invalid credentials'});
  const token = jwt.sign({ _id: user._id }, secret);
  res.json({ _id:user._id, name:user.name, email:user.email, icon:user.icon, token });
});

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipes" });
  }
});

app.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if(!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipe" });
  }
});

app.put('/api/recipes/:id', authMiddleware, async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if(!recipe) return res.status(404).json({ message: "Recipe not found" });
    if(recipe.owner !== req.user._id) return res.status(403).json({message:'Not owner'});
    const updatedRecipe = await recipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe" });
  }
});

app.post('/api/recipes', authMiddleware, async (req, res) => {
  try {
    const { name, preparationTime, image, instructions, ingredients, category, owner } = req.body;
    if(owner !== req.user._id) return res.status(403).json({message:'Not owner'});
    const newRecipe = new recipeModel({ name, preparationTime, image, instructions, ingredients, category, owner });
    await newRecipe.save();
    res.status(201).json({ message: "Recipe Added!", Recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error adding recipe" });
  }
});

app.delete('/api/recipes/:id', authMiddleware, async (req,res)=>{
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if(!recipe) return res.status(404).json({message:'Recipe not found'});
    if(recipe.owner !== req.user._id) return res.status(403).json({message:'Not owner'});
    await recipeModel.findByIdAndDelete(req.params.id);
    res.json({message:'Deleted'});
  } catch(error) {
    res.status(500).json({message:'Error deleting recipe'});
  }
});

app.get('/api/user', authMiddleware, async (req,res)=>{
  try {
    const user = await userModel.findById(req.user._id);
    if(!user) return res.status(404).json({message:'User not found'});
    res.json(user);
  } catch(err) {
    res.status(500).json({message:'Error retrieving user data'});
  }
});

app.get('/api/saved-recipes', authMiddleware, async (req,res)=>{
  try {
    const user = await userModel.findById(req.user._id);
    if(!user) return res.status(404).json({message:'User not found'});
    if(!user.savedRecipes || user.savedRecipes.length === 0) {
      return res.json({savedRecipes:[]});
    }
    const saved = await recipeModel.find({_id: {$in: user.savedRecipes}});
    res.json({savedRecipes:saved});
  } catch(err) {
    res.status(500).json({message:'Error getting saved recipes'});
  }
});

app.post('/api/recipes/:id/save', authMiddleware, async (req,res)=>{
  try {
    const user = await userModel.findById(req.user._id);
    if(!user) return res.status(404).json({message:'User not found'});
    const recipeId = req.params.id;

    const index = user.savedRecipes ? user.savedRecipes.indexOf(recipeId) : -1;

    if(index === -1) {
      // Not saved yet, add it
      user.savedRecipes.push(recipeId);
    } else {
      // Already saved, remove it
      user.savedRecipes.splice(index,1);
    }

    await user.save();
    res.json({message:'Save state toggled', savedRecipes:user.savedRecipes});
  } catch(err) {
    console.log(err);
    res.status(500).json({message:'Error toggling saved state'});
  }
});

// Update rating logic
app.post('/api/recipes/:id/rate', authMiddleware, async (req,res)=>{
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if(!recipe) return res.status(404).json({message:'Recipe not found'});
    if(recipe.owner === req.user._id) return res.status(403).json({message:'Cannot rate own recipe'});
    const { rating } = req.body;
    if(rating < 1 || rating > 5) return res.status(400).json({message:'Invalid rating'});

    // Check if user already rated
    const existingRating = recipe.ratedBy.find(r=>r.userId===req.user._id);
    if(existingRating) {
      // Update existing rating
      existingRating.rating = rating;
    } else {
      // Add new rating
      recipe.ratedBy.push({userId:req.user._id, rating});
    }

    await recipe.save();

    res.json({message:'Rated', updatedRecipe: recipe});
  } catch(error) {
    res.status(500).json({message:'Error rating'});
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
