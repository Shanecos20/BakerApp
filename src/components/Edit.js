// Edit.js 
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const Edit = () => {
    const { id } = useParams(); // Extract recipe ID from URL parameters
    const navigate = useNavigate(); // Hook to navigate programmatically

    const [user, setUser] = useState(null); // State to hold the authenticated user

    // States to manage form inputs
    const [name, setName] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [image, setImage] = useState('');
    const [instructions, setInstructions] = useState([{ stepText: '', stepImage: '' }]); // State to hold multiple instruction steps
    const [ingredients, setIngredients] = useState('');
    const [category, setCategory] = useState('Cakes'); // Default category
    const [owner, setOwner] = useState(null); // State to hold the owner ID of the recipe

    /**
     * useEffect hook to retrieve the authenticated user from localStorage
     * Redirects to the login page if no user is found
     */
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if(storedUser) {
        const u = JSON.parse(storedUser);
        setUser(u);
      } else {
        navigate('/login'); // Redirect to login if user is not authenticated
      }
    }, [navigate]);

    /**
     * useEffect hook to fetch the existing recipe data based on the recipe ID
     * Populates the form fields with the fetched data
     * Redirects to the home page if the authenticated user is not the owner of the recipe
     */
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
              navigate('/'); // Prevent unauthorized editing by redirecting
            }
        })
        .catch((err) => {console.log(err)});
    }, [id, user, navigate]);

    /**
     * Handler to update a specific field of an instruction step
     * @param {number} index - The index of the instruction step to update
     * @param {string} field - The field of the instruction to update ('stepText' or 'stepImage')
     * @param {string} value - The new value for the specified field
     */
    const handleInstructionChange = (index, field, value) => {
      const updated = [...instructions];
      updated[index][field] = value;
      setInstructions(updated);
    };

    /**
     * Handler to add a new instruction step
     * Adds an empty instruction object to the instructions array
     */
    const handleAddInstruction = () => {
      setInstructions([...instructions, { stepText: '', stepImage: '' }]);
    };

    /**
     * Handler for form submission
     * Constructs the updated recipe object and sends a PUT request to update the recipe
     * Redirects to the recipes list upon successful update
     * @param {Event} e - The form submission event
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const updatedRecipe = {
            name,
            preparationTime,
            image,
            instructions,
            ingredients,
            category,
            owner
        };

        // Send PUT request to update the recipe with authorization header
        axios.put('http://localhost:4000/api/recipes/' + id, updatedRecipe, {
          headers: { 'Authorization': 'Bearer ' + (user ? user.token : '') }
        })
        .then(() => {
            navigate('/read'); // Redirect to the recipes list after successful update
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="container mt-4">
            {/* Form header */}
            <h3 className="mb-4 text-center fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
              Edit Recipe
            </h3>
            
            {/* Recipe editing form */}
            <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm bg-light">
                {/* Recipe Name Input */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Recipe Name:</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder="Enter recipe name"
                        required
                    />
                </div>
                
                {/* Preparation Time Input */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Preparation Time (in minutes):</label>
                    <input 
                        type="number"
                        className="form-control"
                        value={preparationTime}
                        onChange={(e) => { setPreparationTime(e.target.value) }}
                        placeholder="Enter preparation time"
                        required
                        min="1"
                    />
                </div>
                
                {/* Image URL Input */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Image URL:</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                        placeholder="Enter image URL"
                        required
                    />
                </div>
                
                {/* Ingredients Input */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Ingredients (comma separated):</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={ingredients}
                        onChange={(e) => { setIngredients(e.target.value) }}
                        placeholder="e.g. flour, sugar, butter"
                        required
                    />
                </div>
                
                {/* Category Selection */}
                <div className="mb-4">
                    <label className="form-label fw-semibold">Category:</label>
                    <select 
                        className="form-control"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                        required
                    >
                      <option value="Cakes">Cakes</option>
                      <option value="Pastries">Pastries</option>
                      <option value="Bread">Bread</option>
                    </select>
                </div>
                
                <hr />
                
                {/* Instructions Section */}
                <h5 className="fw-bold mb-3">Instructions</h5>
                {instructions.map((inst, index) => (
                  <div key={index} className="mb-3">
                    {/* Instruction Step Text Input */}
                    <label className="form-label fw-semibold">Step {index + 1} Text:</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={inst.stepText}
                      onChange={(e) => handleInstructionChange(index, 'stepText', e.target.value)}
                      placeholder="Enter instruction text"
                      required
                    />
                    
                    {/* Instruction Step Image URL Input (optional) */}
                    <label className="form-label fw-semibold">Step {index + 1} Image URL (optional):</label>
                    <input
                      type="text"
                      className="form-control"
                      value={inst.stepImage}
                      onChange={(e) => handleInstructionChange(index, 'stepImage', e.target.value)}
                      placeholder="Enter instruction image URL"
                    />
                  </div>
                ))}
                
                {/* Button to add another instruction step */}
                <div className="text-end mb-4">
                  <Button variant="secondary" onClick={handleAddInstruction}>+ Add Another Instruction</Button>
                </div>
                
                {/* Submit Button */}
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
