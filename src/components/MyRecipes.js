// MyRecipes.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const MyRecipes = () => {
  const [user, setUser] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      // Fetch user-owned recipes
      axios.get('http://localhost:4000/api/recipes')
      .then((res) => {
        const all = res.data.recipes;
        const mine = all.filter(r => r.owner === u._id);
        setMyRecipes(mine);
      })
      .catch(err => console.log(err));

      // Fetch saved recipes (for simplicity, assume a separate endpoint or user model field)
      // Let's say we store saved recipe IDs in the user model and fetch them
      axios.get('http://localhost:4000/api/saved-recipes', {
        headers: { 'Authorization': 'Bearer ' + u.token }
      })
      .then((res) => {
        setSavedRecipes(res.data.savedRecipes);
      })
      .catch(err => console.log(err));
    } else {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center fw-bold mb-4" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
        My Recipes
      </h3>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h5 className="fw-bold mb-3">Recipes I Created</h5>
          {myRecipes.length > 0 ? myRecipes.map(recipe => (
            <Card className="mb-3 shadow-sm" key={recipe._id}>
              <Card.Body>
                <Card.Title className="fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>
                  {recipe.name}
                </Card.Title>
                <Card.Text>
                  <span className="fw-semibold">Category:</span> {recipe.category}
                </Card.Text>
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary fw-bold">
                  View Recipe
                </Link>
              </Card.Body>
            </Card>
          )) : <p>No recipes created yet.</p>}
        </div>
        <div className="col-md-6 mb-4">
          <h5 className="fw-bold mb-3">Recipes I Saved</h5>
          {savedRecipes.length > 0 ? savedRecipes.map(recipe => (
            <Card className="mb-3 shadow-sm" key={recipe._id}>
              <Card.Body>
                <Card.Title className="fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>
                  {recipe.name}
                </Card.Title>
                <Card.Text>
                  <span className="fw-semibold">Category:</span> {recipe.category}
                </Card.Text>
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary fw-bold">
                  View Recipe
                </Link>
              </Card.Body>
            </Card>
          )) : <p>No saved recipes yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default MyRecipes;
