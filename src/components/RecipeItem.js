// RecipeItem.js
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import axios from 'axios';

const RecipeItem = (props) => {
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(props.myrecipe.rating || 0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
    setRating(newRating);
    if(user && user._id !== props.myrecipe.owner) {
      axios.post(`http://localhost:4000/api/recipes/${props.myrecipe._id}/rate`, 
      { rating: newRating }, 
      { headers: { 'Authorization': 'Bearer ' + user.token } })
      .then(() => {})
      .catch(err => console.log(err));
    }
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
              </blockquote>
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
                <div className="mt-3">
                  <span className="fw-semibold me-2">Rate this recipe:</span>
                  {[1,2,3,4,5].map(star => (
                    <span 
                      key={star}
                      style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray', fontSize: '1.2rem', marginRight: '5px' }}
                      onClick={() => handleRating(star)}>
                      ★
                    </span>
                  ))}
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
