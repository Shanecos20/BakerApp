// RecipeItem.js
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import axios from 'axios';

const RecipeItem = (props) => {
  const [user, setUser] = useState(null); // State to hold the authenticated user
  const [userRating, setUserRating] = useState(null); // State to track the current user's rating
  const [averageRating, setAverageRating] = useState(0); // State to hold the average rating of the recipe
  const [ratingCount, setRatingCount] = useState(0); // State to hold the number of ratings
  const [isSaved, setIsSaved] = useState(false); // State to track if the recipe is saved by the user

  /**
   * useEffect hook to fetch user data and initialize ratings and saved state
   * Runs whenever the recipe prop changes
   */
  useEffect(() => {
    // Retrieve the authenticated user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);

      // Fetch user data to get the list of saved recipes
      axios.get('http://localhost:4000/api/user', {
        headers: { 'Authorization': 'Bearer ' + u.token } // Include JWT token for authentication
      })
      .then(res => {
        // Check if the current recipe is in the user's savedRecipes array
        if (res.data.savedRecipes && res.data.savedRecipes.includes(props.myrecipe._id)) {
          setIsSaved(true); // Set isSaved to true if the recipe is saved
        }
      })
      .catch(err => console.log(err));
    }

    // Calculate average rating and check if the user has already rated this recipe
    if (props.myrecipe.ratedBy && props.myrecipe.ratedBy.length > 0) {
      const sum = props.myrecipe.ratedBy.reduce((acc, r) => acc + r.rating, 0); // Sum all ratings
      const avg = sum / props.myrecipe.ratedBy.length; // Calculate average rating
      setAverageRating(avg); // Update averageRating state
      setRatingCount(props.myrecipe.ratedBy.length); // Update ratingCount state

      if (storedUser) {
        const u = JSON.parse(storedUser);
        // Find if the current user has rated the recipe
        const rated = props.myrecipe.ratedBy.find(r => r.userId === u._id);
        if (rated) {
          setUserRating(rated.rating); // Set the user's rating if it exists
        }
      }
    }
  }, [props.myrecipe]);

  /**
   * Handler to delete a recipe
   * Only allows deletion if the authenticated user is the owner of the recipe
   */
  const handleDelete = () => {
    if (user && user._id === props.myrecipe.owner) {
      axios.delete('http://localhost:4000/api/recipes/' + props.myrecipe._id, {
        headers: { 'Authorization': 'Bearer ' + (user ? user.token : '') } // Include JWT token for authentication
      })
      .then(() => {
        window.location.reload(); // Reload the page to reflect the deletion
      })
      .catch(err => console.log(err));
    }
  }

  /**
   * Handler to rate a recipe
   * Prevents users from rating their own recipes
   * Updates the average rating and rating count upon successful rating
   * @param {number} newRating - The rating value selected by the user
   */
  const handleRating = (newRating) => {
    if (!user) return; // Do nothing if the user is not authenticated
    if (user._id === props.myrecipe.owner) return; // Prevent users from rating their own recipes

    setUserRating(newRating); // Optimistically update the user's rating in the UI

    // Send a POST request to rate the recipe
    axios.post(`http://localhost:4000/api/recipes/${props.myrecipe._id}/rate`, 
      { rating: newRating }, 
      { headers: { 'Authorization': 'Bearer ' + user.token } } // Include JWT token for authentication
    )
    .then((res) => {
      const { ratedBy } = res.data.updatedRecipe; // Extract updated ratedBy array from the response
      const sum = ratedBy.reduce((acc, r) => acc + r.rating, 0); // Sum all ratings
      const avg = sum / ratedBy.length; // Calculate new average rating
      setAverageRating(avg); // Update averageRating state
      setRatingCount(ratedBy.length); // Update ratingCount state
    })
    .catch(err => console.log(err));
  }

  /**
   * Handler to toggle the saved state of a recipe
   * Sends a POST request to save or unsave the recipe
   * Updates the isSaved state based on the response
   */
  const handleSaveToggle = () => {
    if (!user) return; // Do nothing if the user is not authenticated

    // Send a POST request to toggle the saved state of the recipe
    axios.post(`http://localhost:4000/api/recipes/${props.myrecipe._id}/save`, {}, {
      headers: { 'Authorization': 'Bearer ' + user.token } // Include JWT token for authentication
    })
    .then(res => {
      // Update isSaved state based on whether the recipe is now saved
      setIsSaved(res.data.savedRecipes.includes(props.myrecipe._id));
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="my-3">
      <Card className="shadow-sm">
        {/* Recipe Header with the recipe name */}
        <Card.Header className="fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>
          {props.myrecipe.name}
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-column flex-md-row align-items-md-center">
            {/* Recipe Image */}
            <div className="me-md-4 mb-3 mb-md-0">
              <img 
                src={props.myrecipe.image} 
                alt={props.myrecipe.name} 
                style={{ maxWidth: '200px', borderRadius: '8px' }} 
              />
            </div>
            {/* Recipe Details and Actions */}
            <div className="flex-grow-1">
              <blockquote className="blockquote mb-3">
                {/* Preparation Time */}
                <p className="mb-1">
                  <span className="fw-semibold">Preparation Time:</span> {props.myrecipe.preparationTime} mins
                </p>
                {/* Category */}
                <p className="mb-1">
                  <span className="fw-semibold">Category:</span> {props.myrecipe.category}
                </p>
                {/* Ingredients */}
                <p className="mb-1">
                  <span className="fw-semibold">Ingredients:</span> {props.myrecipe.ingredients}
                </p>
                {/* Average Rating and Rating Count */}
                {ratingCount > 0 && (
                  <p className="mt-2">
                    <span className="fw-semibold">Average Rating:</span> {averageRating.toFixed(1)} ★ ({ratingCount})
                  </p>
                )}
              </blockquote>
              <div className="d-flex flex-wrap align-items-center">
                {/* Link to view detailed recipe */}
                <Link className="btn btn-success fw-bold px-3 py-2 me-2 mb-2" to={"/recipe/"+ props.myrecipe._id}>
                  View Details
                </Link>
                {/* Show Edit and Delete buttons only if the user is the owner of the recipe */}
                {user && user._id === props.myrecipe.owner && (
                  <>
                    {/* Link to edit the recipe */}
                    <Link className="btn btn-primary fw-bold px-3 py-2 me-2 mb-2" to={"/edit/" + props.myrecipe._id}>
                      Edit
                    </Link>
                    {/* Button to delete the recipe */}
                    <button className="btn btn-danger fw-bold px-3 py-2 mb-2" onClick={handleDelete}>
                      Delete
                    </button>
                  </>
                )}
                {/* Show rating options only if the user is not the owner */}
                {user && user._id !== props.myrecipe.owner && (
                  <div className="mt-3 w-100">
                    <span className="fw-semibold me-2">Rate this recipe:</span>
                    {/* Render stars for rating */}
                    {[1,2,3,4,5].map(star => (
                      <span 
                        key={star}
                        style={{ 
                          cursor: 'pointer', 
                          color: star <= (userRating || 0) ? 'gold' : 'gray', 
                          fontSize: '1.2rem', 
                          marginRight: '5px' 
                        }}
                        onClick={() => handleRating(star)} // Set rating when a star is clicked
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* Save/Unsave button for authenticated users */}
              {user && (
                <div className="mt-3">
                  <button 
                    className="btn btn-outline-secondary fw-bold"
                    onClick={handleSaveToggle} // Toggle save state when clicked
                  >
                    {isSaved ? 'Unsave' : 'Save'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipeItem;
