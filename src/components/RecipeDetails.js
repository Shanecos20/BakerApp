// RecipeDetails.js
// Improved back button styling. Using a Bootstrap button with a small icon or just styled text.
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/api/recipes/' + id)
      .then(res => setRecipe(res.data))
      .catch(err => console.log(err));

    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      axios.get('http://localhost:4000/api/user', {
        headers: { 'Authorization': 'Bearer ' + u.token }
      })
      .then(response => {
        if(response.data.savedRecipes && response.data.savedRecipes.includes(id)) {
          setIsSaved(true);
        }
      })
      .catch(err => console.log(err));
    }
  }, [id]);

  if(!recipe) return null;

  const handleSaveToggle = () => {
    if(!user) return;
    axios.post(`http://localhost:4000/api/recipes/${id}/save`, {}, {
      headers: { 'Authorization': 'Bearer ' + user.token }
    })
    .then(res => {
      setIsSaved(res.data.savedRecipes.includes(id));
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="container mt-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div className="mb-3 d-flex align-items-center">
        <button 
          className="btn btn-outline-primary fw-bold me-3" 
          onClick={() => navigate(-1)} 
          style={{ fontSize: '1rem' }}
        >
          ← Back
        </button>
        {user && (
          <button 
            className="btn btn-outline-secondary fw-bold"
            onClick={handleSaveToggle}
          >
            {isSaved ? 'Unsave' : 'Save'}
          </button>
        )}
      </div>
      <h3 className="text-center fw-bold mb-4" style={{ fontSize: '2rem' }}>
        {recipe.name}
      </h3>
      <div className="border rounded p-4 shadow-sm bg-light">
        <div className="text-center mb-4">
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            style={{ maxWidth: '300px', borderRadius: '8px', border: '2px solid #ccc', padding:'5px' }} 
          />
        </div>
        <p><span className="fw-semibold">Preparation Time:</span> {recipe.preparationTime} mins</p>
        <p><span className="fw-semibold">Category:</span> {recipe.category}</p>
        <p><span className="fw-semibold">Ingredients:</span> {recipe.ingredients}</p>
        <h5 className="fw-bold mt-4 mb-3">Instructions:</h5>
        {recipe.instructions && recipe.instructions.map((inst, index) => (
          <div key={index} className="mb-4">
            <p className="fw-semibold mb-1">Step {index+1}:</p>
            <p>{inst.stepText}</p>
            {inst.stepImage && (
              <div className="text-center">
                <img src={inst.stepImage} alt={`Step ${index+1}`} style={{ maxWidth: '250px', borderRadius: '8px', border: '1px solid #ddd', padding: '3px' }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeDetails;
