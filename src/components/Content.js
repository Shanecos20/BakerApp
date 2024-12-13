import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Header from './Header';

const Content = () => {
  // State to hold the list of top-rated recipes
  const [recipes, setRecipes] = useState([]);

  // useEffect hook to fetch recipes when the component mounts
  useEffect(() => {
    axios.get('http://localhost:4000/api/recipes')
      .then((response) => {
        const allRecipes = response.data.recipes;

        // Calculate the average rating for each recipe
        const ratedRecipes = allRecipes.map(recipe => {
          if (recipe.ratedBy && recipe.ratedBy.length > 0) {
            const sum = recipe.ratedBy.reduce((acc, r) => acc + r.rating, 0);
            const avg = sum / recipe.ratedBy.length;
            return { ...recipe, averageRating: avg };
          }
          return { ...recipe, averageRating: 0 };
        });

        // Sort recipes by average rating in descending order
        ratedRecipes.sort((a, b) => b.averageRating - a.averageRating);

        // Select the top 4 recipes
        const topRecipes = ratedRecipes.slice(0, 4);
        setRecipes(topRecipes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="container mt-4">
      <Header />
      {/* HR to seperate header and top rated recipes */}
      <hr></hr>
      {/* Grid of top-rated recipe cards */}
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-3 mb-4" key={recipe._id}>
            <Card className="h-100 shadow-sm">
              {/* Recipe image */}
              <Card.Img variant="top" src={recipe.image} alt={recipe.name} style={{ height: '200px', objectFit: 'cover' }} />

              {/* Recipe details */}
              <Card.Body className="d-flex flex-column">
                {/* Recipe name */}
                <Card.Title className="fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>
                  {recipe.name}
                </Card.Title>

                {/* Recipe category */}
                <Card.Text className="mb-2">
                  <span className="fw-semibold">Category:</span> {recipe.category}
                </Card.Text>

                {/* Display average rating if available */}
                {recipe.averageRating > 0 && (
                  <Card.Text className="mb-2">
                    <span className="fw-semibold">Average Rating:</span> {recipe.averageRating.toFixed(1)} ★ ({recipe.ratedBy.length})
                  </Card.Text>
                )}

                {/* Link to view the full recipe */}
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary fw-bold w-100 mt-auto">
                  View Recipe
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Link to view all recipes */}
      <div className="text-center mt-5">
        <Link to="/read" className="btn btn-primary fw-bold">
          View All Recipes
        </Link>
      </div>
    </div>
  );
}

export default Content;
