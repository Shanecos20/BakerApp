// Read.js
import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "./Recipes";
import { Form, Button, Row, Col } from 'react-bootstrap';

const Read = () => {
  const [recipes, setRecipes] = useState([]); // State to hold all fetched recipes
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for category filter
  const [ingredientFilter, setIngredientFilter] = useState(''); // State for ingredient filter

  /**
   * useEffect hook to fetch all recipes from the backend API when the component mounts
   */
  useEffect(() => {
    axios.get('http://localhost:4000/api/recipes')
      .then((response) => {
        setRecipes(response.data.recipes); // Populate recipes state with fetched data
      })
      .catch((error) => {
        console.log(error); // Log any errors during the fetch
      });
  }, []);

  /**
   * Function to filter recipes based on search term, selected category, and ingredient filter
   * @returns {Array} - Array of recipes that match the filter criteria
   */
  const filteredRecipes = recipes.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()); // Check if recipe name includes the search term
    const categoryMatch = (selectedCategory === 'All') || 
                          (recipe.category && recipe.category.toLowerCase() === selectedCategory.toLowerCase()); // Check if recipe matches the selected category
    const ingredientMatch = ingredientFilter.trim() === '' 
                            ? true 
                            : recipe.ingredients.toLowerCase().includes(ingredientFilter.toLowerCase()); // Check if recipe includes the specified ingredient

    return nameMatch && categoryMatch && ingredientMatch; // Return true if all conditions are met
  });

  return (
    <div className="container mt-4">
      {/* Page header */}
      <h3 className="mb-4 text-center fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
        All Recipes
      </h3>
      
      {/* Filter section with search, category, and ingredient filters */}
      <div className="mb-5 border rounded p-4 bg-light shadow-sm">
        <Form>
          <Row className="mb-3">
            {/* Search by Name */}
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Label className="fw-semibold">Search by Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g. Chocolate Cake" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </Col>
            
            {/* Filter by Category */}
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
            
            {/* Filter by Ingredient */}
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
          
          {/* Reset Filters Button */}
          <div className="text-center mt-3">
            <Button 
              variant="primary" 
              className="fw-bold px-4 py-2"
              onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setIngredientFilter('');}} // Reset all filter states
            >
              Reset Filters
            </Button>
          </div>
        </Form>
      </div>
      
      {/* Render the filtered recipes using the Recipes component */}
      <Recipes myRecipes={filteredRecipes} />
    </div>
  );
}

export default Read;
