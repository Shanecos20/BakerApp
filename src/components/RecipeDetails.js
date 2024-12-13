// RecipeDetails.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams(); // Extract the recipe ID from the URL parameters
  const [recipe, setRecipe] = useState(null); // State to hold the fetched recipe details
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const [user, setUser] = useState(null); // State to hold the authenticated user
  const [isSaved, setIsSaved] = useState(false); // State to track if the recipe is saved by the user

  /**
   * useEffect hook to fetch recipe details and user information when the component mounts
   */
  useEffect(() => {
    // Fetch the recipe details based on the recipe ID
    axios.get('http://localhost:4000/api/recipes/' + id)
      .then(res => setRecipe(res.data)) // Set the fetched recipe data to state
      .catch(err => console.log(err)); // Log any errors during the fetch

    // Retrieve the authenticated user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u); // Set the user state with the parsed user data

      // Fetch the user's saved recipes to determine if the current recipe is saved
      axios.get('http://localhost:4000/api/user', {
        headers: { 'Authorization': 'Bearer ' + u.token } // Include the JWT token in the request headers
      })
        .then(response => {
          // Check if the current recipe ID is in the user's savedRecipes array
          if (response.data.savedRecipes && response.data.savedRecipes.includes(id)) {
            setIsSaved(true); // Set isSaved to true if the recipe is already saved
          }
        })
        .catch(err => console.log(err)); // Log any errors during the fetch
    }
  }, [id]); // Dependency array ensures this effect runs when the recipe ID changes

  // If the recipe data hasn't been fetched yet, return null to avoid rendering
  if (!recipe) return null;

  /**
   * Handler to toggle the saved state of the recipe
   * Sends a POST request to toggle saving/unsaving the recipe
   */
  const handleSaveToggle = () => {
    if (!user) return; // If there's no authenticated user, do nothing

    axios.post(`http://localhost:4000/api/recipes/${id}/save`, {}, {
      headers: { 'Authorization': 'Bearer ' + user.token } // Include the JWT token in the request headers
    })
      .then(res => {
        // Update the isSaved state based on the response
        setIsSaved(res.data.savedRecipes.includes(id));
      })
      .catch(err => console.log(err)); // Log any errors during the request
  }

  return (
    <div className="container mt-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Back and Save/Unsave Buttons */}
      <div className="mb-3 d-flex align-items-center">
        {/* Back button with improved styling */}
        <button 
          className="btn btn-outline-primary fw-bold me-3" 
          onClick={() => navigate(-1)} // Navigate back to the previous page
          style={{ fontSize: '1rem' }}
        >
          ← Back
        </button>
        {user && (
          // Save or Unsave button visible only to authenticated users
          <button 
            className="btn btn-outline-secondary fw-bold"
            onClick={handleSaveToggle} // Toggle the saved state when clicked
          >
            {isSaved ? 'Unsave' : 'Save'} {/* Display 'Unsave' if already saved, otherwise 'Save' */}
          </button>
        )}
      </div>
      
      {/* Recipe Title */}
      <h3 className="text-center fw-bold mb-4" style={{ fontSize: '2rem' }}>
        {recipe.name}
      </h3>
      
      {/* Recipe Details Section */}
      <div className="border rounded p-4 shadow-sm bg-light">
        {/* Recipe Image */}
        <div className="text-center mb-4">
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            style={{ 
              maxWidth: '300px', 
              borderRadius: '8px', 
              border: '2px solid #ccc', 
              padding: '5px' 
            }} 
          />
        </div>
        
        {/* Preparation Time */}
        <p>
          <span className="fw-semibold">Preparation Time:</span> {recipe.preparationTime} mins
        </p>
        
        {/* Category */}
        <p>
          <span className="fw-semibold">Category:</span> {recipe.category}
        </p>
        
        {/* Ingredients */}
        <p>
          <span className="fw-semibold">Ingredients:</span> {recipe.ingredients}
        </p>
        
        {/* Instructions Section */}
        <h5 className="fw-bold mt-4 mb-3">Instructions:</h5>
        {recipe.instructions && recipe.instructions.map((inst, index) => (
          <div key={index} className="mb-4">
            {/* Step Number */}
            <p className="fw-semibold mb-1">Step {index + 1}:</p>
            {/* Step Text */}
            <p>{inst.stepText}</p>
            {/* Step Image (optional) */}
            {inst.stepImage && (
              <div className="text-center">
                <img 
                  src={inst.stepImage} 
                  alt={`Step ${index + 1}`} 
                  style={{ 
                    maxWidth: '250px', 
                    borderRadius: '8px', 
                    border: '1px solid #ddd', 
                    padding: '3px' 
                  }} 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeDetails;
