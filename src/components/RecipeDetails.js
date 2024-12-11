// RecipeDetails.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/recipes/' + id)
      .then(res => setRecipe(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if(!recipe) return null;

  return (
    <div className="container mt-4">
      <h3 className="text-center fw-bold mb-4" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
        {recipe.name}
      </h3>
      <div className="border rounded p-4 shadow-sm bg-light">
        <div className="text-center mb-4">
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            style={{ maxWidth: '300px', borderRadius: '8px' }} 
          />
        </div>
        <p><span className="fw-semibold">Preparation Time:</span> {recipe.preparationTime} mins</p>
        <p><span className="fw-semibold">Category:</span> {recipe.category}</p>
        <p><span className="fw-semibold">Ingredients:</span> {recipe.ingredients}</p>
        <p><span className="fw-semibold">Instructions:</span></p>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetails;
