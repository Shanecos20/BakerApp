// Edit.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [name, setName] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [image, setImage] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [category, setCategory] = useState('Cakes');
    const [owner, setOwner] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if(storedUser) {
        const u = JSON.parse(storedUser);
        setUser(u);
      } else {
        navigate('/login');
      }
    }, [navigate]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/recipes/' + id)
        .then((res) => {
            setName(res.data.name);
            setPreparationTime(res.data.preparationTime);
            setImage(res.data.image);
            setInstructions(res.data.instructions);
            setIngredients(res.data.ingredients);
            setCategory(res.data.category);
            setOwner(res.data.owner);
            if(user && res.data.owner !== user._id) {
              navigate('/');
            }
        })
        .catch((err) => {console.log(err)});
    }, [id, user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedRecipe = {
            name,
            preparationTime,
            image,
            instructions,
            ingredients,
            category,
            owner
        };

        axios.put('http://localhost:4000/api/recipes/' + id, updatedRecipe, {
          headers: { 'Authorization': 'Bearer ' + (user ? user.token : '') }
        })
        .then(() => {
            navigate('/read');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-center fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
              Edit Recipe
            </h3>
            <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm bg-light">
                <div className="mb-3">
                    <label className="form-label fw-semibold">Recipe Name:</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder="Enter recipe name"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Preparation Time (in minutes):</label>
                    <input 
                        type="number"
                        className="form-control"
                        value={preparationTime}
                        onChange={(e) => { setPreparationTime(e.target.value) }}
                        placeholder="Enter preparation time"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Image URL:</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                        placeholder="Enter image URL"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Instructions:</label>
                    <textarea 
                        className="form-control"
                        rows="4"
                        value={instructions}
                        onChange={(e) => { setInstructions(e.target.value) }}
                        placeholder="Enter step-by-step instructions"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Ingredients (comma separated):</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={ingredients}
                        onChange={(e) => { setIngredients(e.target.value) }}
                        placeholder="e.g. flour, sugar, butter"
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label fw-semibold">Category:</label>
                    <select 
                        className="form-control"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                    >
                      <option value="Cakes">Cakes</option>
                      <option value="Pastries">Pastries</option>
                      <option value="Bread">Bread</option>
                    </select>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary fw-bold px-4 py-2">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
