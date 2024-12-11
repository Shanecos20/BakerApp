// Recipes.js
import RecipeItem from "./RecipeItem";

const Recipes = (props) => {
    return props.myRecipes.map(
        (recipe) => {
            return <RecipeItem myrecipe={recipe} key={recipe._id} />
        }
    );
}

export default Recipes;
