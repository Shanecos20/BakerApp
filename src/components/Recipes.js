// Recipes.js
import RecipeItem from "./RecipeItem";

/**
 * Recipes component
 * 
 * This component receives a list of recipes through props and renders each recipe using the RecipeItem component.
 * It maps over the myRecipes array and passes each recipe object as a prop to RecipeItem.
 * 
 * @param {Object} props - The properties passed to the Recipes component.
 * @param {Array} props.myRecipes - An array of recipe objects to be displayed.
 */
const Recipes = (props) => {
    return props.myRecipes.map(
        (recipe) => {
            // Render a RecipeItem component for each recipe in the myRecipes array
            // Pass the recipe object and a unique key prop to each RecipeItem
            return <RecipeItem myrecipe={recipe} key={recipe._id} />
        }
    );
}

export default Recipes;
