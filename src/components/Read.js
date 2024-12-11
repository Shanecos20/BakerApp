// Read.js
import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "./Recipes";

const Read = () => {
  const [recipes, setRecipes] = useState([]);

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

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
        All Recipes
      </h3>
      <Recipes myRecipes={recipes} />
    </div>
  );
}

export default Read;
