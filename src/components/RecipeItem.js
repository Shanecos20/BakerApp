// RecipeItem.js (Add a save/unsave button)
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import axios from 'axios';

const RecipeItem = (props) => {
  const [user, setUser] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      // Fetch user data to get savedRecipes
      axios.get('http://localhost:4000/api/user', {
        headers: { 'Authorization': 'Bearer ' + u.token }
      })
      .then(res => {
        if(res.data.savedRecipes && res.data.savedRecipes.includes(props.myrecipe._id)) {
          setIsSaved(true);
        }
      })
      .catch(err => console.log(err));
    }

    if(props.myrecipe.ratedBy && props.myrecipe.ratedBy.length > 0) {
      const sum = props.myrecipe.ratedBy.reduce((acc, r) => acc + r.rating, 0);
      const avg = sum / props.myrecipe.ratedBy.length;
      setAverageRating(avg);
      setRatingCount(props.myrecipe.ratedBy.length);
      if(storedUser) {
        const u = JSON.parse(storedUser);
        const rated = props.myrecipe.ratedBy.find(r => r.userId === u._id);
        if(rated) {
          setUserRating(rated.rating);
        }
      }
    }
  }, [props.myrecipe]);

  const handleDelete = () => {
    if(user && user._id === props.myrecipe.owner) {
      axios.delete('http://localhost:4000/api/recipes/' + props.myrecipe._id, {
        headers: { 'Authorization': 'Bearer ' + (user ? user.token : '') }
      })
      .then(() => {
        window.location.reload();
      })
      .catch(err => console.log(err));
    }
  }

  const handleRating = (newRating) => {
    if(!user) return;
    if(user._id === props.myrecipe.owner) return;

    setUserRating(newRating);
    axios.post(`http://localhost:4000/api/recipes/${props.myrecipe._id}/rate`, 
      { rating: newRating }, 
      { headers: { 'Authorization': 'Bearer ' + user.token } })
      .then((res) => {
        const { ratedBy } = res.data.updatedRecipe;
        const sum = ratedBy.reduce((acc, r) => acc + r.rating, 0);
        const avg = sum / ratedBy.length;
        setAverageRating(avg);
        setRatingCount(ratedBy.length);
      })
      .catch(err => console.log(err));
  }

  const handleSaveToggle = () => {
    if(!user) return;
    axios.post(`http://localhost:4000/api/recipes/${props.myrecipe._id}/save`, {}, {
      headers: { 'Authorization': 'Bearer ' + user.token }
    })
    .then(res => {
      setIsSaved(res.data.savedRecipes.includes(props.myrecipe._id));
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="my-3">
      <Card className="shadow-sm">
        <Card.Header className="fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>
          {props.myrecipe.name}
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-column flex-md-row align-items-md-center">
            <div className="me-md-4 mb-3 mb-md-0">
              <img 
                src={props.myrecipe.image} 
                alt={props.myrecipe.name} 
                style={{ maxWidth: '200px', borderRadius: '8px' }} 
              />
            </div>
            <div className="flex-grow-1">
              <blockquote className="blockquote mb-3">
                <p className="mb-1">
                  <span className="fw-semibold">Preparation Time:</span> {props.myrecipe.preparationTime} mins
                </p>
                <p className="mb-1">
                  <span className="fw-semibold">Category:</span> {props.myrecipe.category}
                </p>
                <p className="mb-1">
                  <span className="fw-semibold">Ingredients:</span> {props.myrecipe.ingredients}
                </p>
                {ratingCount > 0 && (
                  <p className="mt-2">
                    <span className="fw-semibold">Average Rating:</span> {averageRating.toFixed(1)} ★ ({ratingCount})
                  </p>
                )}
              </blockquote>
              <div className="d-flex flex-wrap align-items-center">
                <Link className="btn btn-success fw-bold px-3 py-2 me-2 mb-2" to={"/recipe/"+ props.myrecipe._id}>
                  View Details
                </Link>
                {user && user._id === props.myrecipe.owner && (
                  <>
                    <Link className="btn btn-primary fw-bold px-3 py-2 me-2 mb-2" to={"/edit/" + props.myrecipe._id}>
                      Edit
                    </Link>
                    <button className="btn btn-danger fw-bold px-3 py-2 mb-2" onClick={handleDelete}>
                      Delete
                    </button>
                  </>
                )}
                {user && user._id !== props.myrecipe.owner && (
                  <div className="mt-3 w-100">
                    <span className="fw-semibold me-2">Rate this recipe:</span>
                    {[1,2,3,4,5].map(star => (
                      <span 
                        key={star}
                        style={{ cursor: 'pointer', color: star <= (userRating || 0) ? 'gold' : 'gray', fontSize: '1.2rem', marginRight: '5px' }}
                        onClick={() => handleRating(star)}>
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {user && (
                <div className="mt-3">
                  <button 
                    className="btn btn-outline-secondary fw-bold"
                    onClick={handleSaveToggle}
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
