// MyRecipes.js
// Display images, edit/delete for owned recipes, and unsave for saved recipes.
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

      // Fetch saved recipes
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

  const handleDelete = (id) => {
    if(!user) return;
    axios.delete(`http://localhost:4000/api/recipes/${id}`, {
      headers: { 'Authorization': 'Bearer ' + user.token }
    })
    .then(() => {
      setMyRecipes(myRecipes.filter(r => r._id !== id));
    })
    .catch(err => console.log(err));
  }

  const handleUnsave = (id) => {
    if(!user) return;
    axios.post(`http://localhost:4000/api/recipes/${id}/save`, {}, {
      headers: { 'Authorization': 'Bearer ' + user.token }
    })
    .then(res => {
      const newSaved = res.data.savedRecipes;
      setSavedRecipes(savedRecipes.filter(r => r._id !== id));
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="container mt-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <h3 className="text-center fw-bold mb-4" style={{ fontSize: '2rem', fontFamily: "Caveat   " }}>
        My Recipes
      </h3>
      <div className="row g-4">
        <div className="col-md-6">
          <h5 className="fw-bold mb-3">Recipes I Created</h5>
          {myRecipes.length > 0 ? myRecipes.map(recipe => (
            <Card className="mb-3 shadow-sm" key={recipe._id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="img-fluid rounded-start" 
                    style={{ objectFit:'cover', height:'100%' }}
                  />
                </div>
                <div className="col-md-8 d-flex flex-column">
                  <Card.Body className="flex-grow-1">
                    <Card.Title className="fw-bold" style={{ fontSize: '1.3rem' }}>
                      {recipe.name}
                    </Card.Title>
                    <Card.Text className="mb-2">
                      <span className="fw-semibold">Category:</span> {recipe.category}
                    </Card.Text>
                  </Card.Body>
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

        <div className="col-md-6">
          <h5 className="fw-bold mb-3">Recipes I Saved</h5>
          {savedRecipes.length > 0 ? savedRecipes.map(recipe => (
            <Card className="mb-3 shadow-sm" key={recipe._id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="img-fluid rounded-start" 
                    style={{ objectFit:'cover', height:'100%' }}
                  />
                </div>
                <div className="col-md-8 d-flex flex-column">
                  <Card.Body className="flex-grow-1">
                    <Card.Title className="fw-bold" style={{ fontSize: '1.3rem' }}>
                      {recipe.name}
                    </Card.Title>
                    <Card.Text className="mb-2">
                      <span className="fw-semibold">Category:</span> {recipe.category}
                    </Card.Text>
                  </Card.Body>
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
