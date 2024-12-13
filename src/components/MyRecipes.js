// MyRecipes.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const MyRecipes = () => {
  const [user, setUser] = useState(null); // State to hold the authenticated user
  const [myRecipes, setMyRecipes] = useState([]); // State to hold recipes created by the user
  const [savedRecipes, setSavedRecipes] = useState([]); // State to hold recipes saved by the user

  /**
   * useEffect hook to retrieve the authenticated user from localStorage
   * and fetch both owned and saved recipes
   * Redirects to the login page if no user is found
   */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);

      // Fetch all recipes to filter out the ones owned by the user
      axios.get('http://localhost:4000/api/recipes')
        .then((res) => {
          const all = res.data.recipes;
          const mine = all.filter(r => r.owner === u._id);
          setMyRecipes(mine);
        })
        .catch(err => console.log(err));

      // Fetch recipes that the user has saved
      axios.get('http://localhost:4000/api/saved-recipes', {
        headers: { 'Authorization': 'Bearer ' + u.token }
      })
        .then((res) => {
          setSavedRecipes(res.data.savedRecipes);
        })
        .catch(err => console.log(err));
    } else {
      window.location.href = '/login'; // Redirect to login if user is not authenticated
    }
  }, []);

  /**
   * Handler to delete a recipe owned by the user
   * Sends a DELETE request to the server and updates the state upon success
   * @param {string} id - The ID of the recipe to delete
   */
  const handleDelete = (id) => {
    if (!user) return; // Ensure the user is authenticated
    axios.delete(`http://localhost:4000/api/recipes/${id}`, {
      headers: { 'Authorization': 'Bearer ' + user.token }
    })
      .then(() => {
        // Remove the deleted recipe from the myRecipes state
        setMyRecipes(myRecipes.filter(r => r._id !== id));
      })
      .catch(err => console.log(err));
  }

  /**
   * Handler to unsave a saved recipe
   * Sends a POST request to toggle the saved state and updates the state upon success
   * @param {string} id - The ID of the recipe to unsave
   */
  const handleUnsave = (id) => {
    if (!user) return; // Ensure the user is authenticated
    axios.post(`http://localhost:4000/api/recipes/${id}/save`, {}, {
      headers: { 'Authorization': 'Bearer ' + user.token }
    })
      .then(res => {
        // Remove the unsaved recipe from the savedRecipes state
        setSavedRecipes(savedRecipes.filter(r => r._id !== id));
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="container mt-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Page header */}
      <h3 className="text-center fw-bold mb-4" style={{ fontSize: '2rem', fontFamily: "Caveat" }}>
        My Recipes
      </h3>
      
      <div className="row g-4">
        {/* Section for recipes created by the user */}
        <div className="col-md-6">
          <h5 className="fw-bold mb-3">Recipes I Created</h5>
          {myRecipes.length > 0 ? myRecipes.map(recipe => (
            <Card className="mb-3 shadow-sm" key={recipe._id}>
              <div className="row g-0">
                {/* Recipe Image */}
                <div className="col-md-4">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="img-fluid rounded-start" 
                    style={{ objectFit: 'cover', height: '100%' }}
                  />
                </div>
                
                {/* Recipe Details and Actions */}
                <div className="col-md-8 d-flex flex-column">
                  <Card.Body className="flex-grow-1">
                    {/* Recipe Name */}
                    <Card.Title className="fw-bold" style={{ fontSize: '1.3rem' }}>
                      {recipe.name}
                    </Card.Title>
                    
                    {/* Recipe Category */}
                    <Card.Text className="mb-2">
                      <span className="fw-semibold">Category:</span> {recipe.category}
                    </Card.Text>
                  </Card.Body>
                  
                  {/* Action Buttons: View, Edit, Delete */}
                  <div className="d-flex justify-content-start p-3">
                    <Link to={`/recipe/${recipe._id}`} className="btn btn-success fw-bold me-2">
                      View
                    </Link>
                    <Link to={`/edit/${recipe._id}`} className="btn btn-primary fw-bold me-2">
                      Edit
                    </Link>
                    <button className="btn btn-danger fw-bold" onClick={() => handleDelete(recipe._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )) : <p>You haven't created any recipes yet.</p>}
        </div>

        {/* Section for recipes saved by the user */}
        <div className="col-md-6">
          <h5 className="fw-bold mb-3">Recipes I Saved</h5>
          {savedRecipes.length > 0 ? savedRecipes.map(recipe => (
            <Card className="mb-3 shadow-sm" key={recipe._id}>
              <div className="row g-0">
                {/* Recipe Image */}
                <div className="col-md-4">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="img-fluid rounded-start" 
                    style={{ objectFit: 'cover', height: '100%' }}
                  />
                </div>
                
                {/* Recipe Details and Actions */}
                <div className="col-md-8 d-flex flex-column">
                  <Card.Body className="flex-grow-1">
                    {/* Recipe Name */}
                    <Card.Title className="fw-bold" style={{ fontSize: '1.3rem' }}>
                      {recipe.name}
                    </Card.Title>
                    
                    {/* Recipe Category */}
                    <Card.Text className="mb-2">
                      <span className="fw-semibold">Category:</span> {recipe.category}
                    </Card.Text>
                  </Card.Body>
                  
                  {/* Action Buttons: View, Unsave */}
                  <div className="d-flex justify-content-start p-3">
                    <Link to={`/recipe/${recipe._id}`} className="btn btn-primary fw-bold me-2">
                      View
                    </Link>
                    <button className="btn btn-secondary fw-bold" onClick={() => handleUnsave(recipe._id)}>
                      Unsave
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )) : <p>You haven't saved any recipes yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default MyRecipes;
