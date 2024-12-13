import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Create = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [user, setUser] = useState(null); // State to hold the authenticated user

    // States to manage form inputs
    const [name, setName] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [image, setImage] = useState('');
    const [instructions, setInstructions] = useState([
      { stepText: '', stepImage: '' }
    ]); // State to hold multiple instruction steps
    const [ingredients, setIngredients] = useState('');
    const [category, setCategory] = useState('Cakes'); // Default category

    /**
     * useEffect hook to retrieve the authenticated user from localStorage
     * Redirects to the login page if no user is found
     */
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if(storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        navigate('/login');
      }
    }, [navigate]);

    /**
     * Handler to add a new instruction step
     * Adds an empty instruction object to the instructions array
     */
    const handleAddInstruction = () => {
      setInstructions([...instructions, { stepText: '', stepImage: '' }]);
    };

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
     * Handler for form submission
     * Constructs the recipe object and sends a POST request to create a new recipe
     * Redirects to the recipes list upon successful creation
     * @param {Event} e - The form submission event
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const recipe = {
            name,
            preparationTime,
            image,
            instructions,
            ingredients,
            category,
            owner: user ? user._id : null // Associate recipe with the authenticated user
        };

        // Send POST request to create a new recipe with authorization header
        axios.post('http://localhost:4000/api/recipes', recipe, {
          headers: { 'Authorization': 'Bearer ' + (user ? user.token : '') }
        })
        .then((res) => { 
          navigate('/read'); // Redirect to the recipes list after successful creation
        })
        .catch((error) => { console.log(error) });
    }

    return (
        <div className="container mt-4">
            {/* Form header */}
            <h3 className="mb-4 text-center fw-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
              Add a New Recipe
            </h3>
            
            {/* Recipe creation form */}
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
                        Add Recipe
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Create;
