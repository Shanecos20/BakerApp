// Edit.js (Update to handle instructions as array)
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [name, setName] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [image, setImage] = useState('');
    const [instructions, setInstructions] = useState([{ stepText: '', stepImage: '' }]);
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
            setInstructions(res.data.instructions || [{ stepText: '', stepImage: '' }]);
            setIngredients(res.data.ingredients);
            setCategory(res.data.category);
            setOwner(res.data.owner);
            if(user && res.data.owner !== user._id) {
              navigate('/');
            }
        })
        .catch((err) => {console.log(err)});
    }, [id, user, navigate]);

    const handleInstructionChange = (index, field, value) => {
      const updated = [...instructions];
      updated[index][field] = value;
      setInstructions(updated);
    };

    const handleAddInstruction = () => {
      setInstructions([...instructions, { stepText: '', stepImage: '' }]);
    };

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
                <hr />
                <h5 className="fw-bold mb-3">Instructions</h5>
                {instructions.map((inst, index) => (
                  <div key={index} className="mb-3">
                    <label className="form-label fw-semibold">Step {index+1} Text:</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={inst.stepText}
                      onChange={(e) => handleInstructionChange(index, 'stepText', e.target.value)}
                      placeholder="Enter instruction text"
                    />
                    <label className="form-label fw-semibold">Step {index+1} Image URL (optional):</label>
                    <input
                      type="text"
                      className="form-control"
                      value={inst.stepImage}
                      onChange={(e) => handleInstructionChange(index, 'stepImage', e.target.value)}
                      placeholder="Enter instruction image URL"
                    />
                  </div>
                ))}
                <div className="text-end mb-4">
                  <Button variant="secondary" onClick={handleAddInstruction}>+ Add Another Instruction</Button>
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
