// RecipeItem.js
import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const RecipeItem = (props) => {
  useEffect(() => {
    console.log("Recipe Item:", props.myrecipe);
  }, [props.myrecipe]); // Only run this effect when the myrecipe prop changes

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
              <Link className="btn btn-primary fw-bold px-3 py-2" to={"/edit/" + props.myrecipe._id}>
                Edit
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipeItem;
