import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "./Recipes";
import { Form, Button, Row, Col } from 'react-bootstrap';

const Read = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ingredientFilter, setIngredientFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/recipes')
      .then((response) => {
        console.log(response.data);
        setRecipes(response.data.recipes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = (selectedCategory === 'All') || 
                          (recipe.category && recipe.category.toLowerCase() === selectedCategory.toLowerCase());
    const ingredientMatch = ingredientFilter.trim() === '' 
                            ? true 
                            : recipe.ingredients.toLowerCase().includes(ingredientFilter.toLowerCase());

    return nameMatch && categoryMatch && ingredientMatch;
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
        All Recipes
      </h3>
      <div className="mb-5 border rounded p-4 bg-light shadow-sm">
        <Form>
          <Row className="mb-3">
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Label className="fw-semibold">Search by Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g. Chocolate Cake" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Label className="fw-semibold">Filter by Category</Form.Label>
              <Form.Select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Cakes">Cakes</option>
                <option value="Pastries">Pastries</option>
                <option value="Bread">Bread</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label className="fw-semibold">Filter by Ingredient</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g. sugar"
                value={ingredientFilter}
                onChange={(e) => setIngredientFilter(e.target.value)} 
              />
            </Col>
          </Row>
          <div className="text-center mt-3">
            <Button 
              variant="primary" 
              className="fw-bold px-4 py-2"
              onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setIngredientFilter('');}}
            >
              Reset Filters
            </Button>
          </div>
        </Form>
      </div>
      <Recipes myRecipes={filteredRecipes} />
    </div>
  );
}

export default Read;
