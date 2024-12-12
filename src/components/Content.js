import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const Content = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/recipes')
      .then((response) => {
        const allRecipes = response.data.recipes;
        const ratedRecipes = allRecipes.map(recipe => {
          if (recipe.ratedBy && recipe.ratedBy.length > 0) {
            const sum = recipe.ratedBy.reduce((acc, r) => acc + r.rating, 0);
            const avg = sum / recipe.ratedBy.length;
            return { ...recipe, averageRating: avg };
          }
          return { ...recipe, averageRating: 0 };
        });

        ratedRecipes.sort((a, b) => b.averageRating - a.averageRating);
        const topRecipes = ratedRecipes.slice(0, 4);
        setRecipes(topRecipes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center fw-bold mb-4" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
        Welcome to Bakehouse Recipes
      </h3>
      <p className="text-center mb-5">
        Discover and share delicious baked recipes from around the world. 
        <br />Below are some of our top-rated recipes to inspire your next bake!
      </p>
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-3 mb-4" key={recipe._id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={recipe.image} alt={recipe.name} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>{recipe.name}</Card.Title>
                <Card.Text className="mb-2">
                  <span className="fw-semibold">Category:</span> {recipe.category}
                </Card.Text>
                {recipe.averageRating > 0 && (
                  <Card.Text className="mb-2">
                    <span className="fw-semibold">Average Rating:</span> {recipe.averageRating.toFixed(1)} ★ ({recipe.ratedBy.length})
                  </Card.Text>
                )}
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary fw-bold w-100 mt-auto">
                  View Recipe
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <Link to="/read" className="btn btn-secondary fw-bold">
          View All Recipes
        </Link>
      </div>
    </div>
  );
}

export default Content;
