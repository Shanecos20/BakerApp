const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.2dzjp.mongodb.net/recipesDB');

const recipeSchema = new mongoose.Schema({
  name: String,
  preparationTime: Number,
  image: String,
  instructions: String,
  ingredients: String,
  category: String
});

const recipeModel = new mongoose.model('recipesCollection', recipeSchema);

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await recipeModel.find({});
    res.status(200).json({ recipes });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).json({ message: "Error retrieving recipe" });
  }
});

app.put('/api/recipes/:id', async (req, res) => {
  try {
    const updatedRecipe = await recipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.send(updatedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating recipe" });
  }
});

app.post('/api/recipes', async (req, res) => {
  try {
    const { name, preparationTime, image, instructions, ingredients, category } = req.body;
    const newRecipe = new recipeModel({ name, preparationTime, image, instructions, ingredients, category });
    await newRecipe.save();
    res.status(201).json({ message: "Recipe Added!", Recipe: newRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding recipe" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
