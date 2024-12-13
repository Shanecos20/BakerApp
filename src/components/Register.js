// Register.js
// Update the user icons to use the provided Imgur links
import { useState } from 'react';
import axios from 'axios';

// Array of user icon URLs from Imgur to assign randomly upon registration
const userIcons = [
  'https://i.ibb.co/BG9HQDT/Muffin-Man.png',
  'https://i.ibb.co/37mdS42/Mixer.png',
  'https://i.ibb.co/6g3JZCW/Cupcake.png',
  'https://i.ibb.co/RSMzPrh/Bread.png'
];

const Register = () => {
  // State hooks to manage form inputs
  const [email, setEmail] = useState(''); // State for user's email
  const [password, setPassword] = useState(''); // State for user's password
  const [name, setName] = useState(''); // State for user's name

  /**
   * Handler for form submission
   * Sends a POST request to register a new user with the provided details
   * Assigns a random icon from the userIcons array to the new user
   * Stores the returned user data in localStorage and redirects to the home page upon success
   * @param {Event} e - The form submission event
   */
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Select a random icon from the userIcons array
    const icon = userIcons[Math.floor(Math.random() * userIcons.length)];

    // Send a POST request to the backend API to register the new user
    axios.post('http://localhost:4000/api/register', { email, password, name, icon })
      .then(res => {
        // Store the returned user data in localStorage for persistent authentication
        localStorage.setItem('user', JSON.stringify(res.data));
        // Redirect the user to the home page after successful registration
        window.location.href = '/';
      })
      .catch(err => console.log(err)); // Log any errors that occur during the registration process
  }

  return (
    <div className="container mt-4">
      {/* Registration form header */}
      <h3 className="text-center fw-bold mb-4" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
        Register
      </h3>
      
      {/* Registration form */}
      <form 
        onSubmit={handleRegister} 
        className="border rounded p-4 shadow-sm bg-light" 
        style={{ maxWidth: '400px', margin: '0 auto' }} // Center the form with a maximum width
      >
        {/* Name Input Field */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Name:</label>
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} // Update the name state on input change
            required // Make this field required
            placeholder="Enter your name" // Placeholder text for better UX
          />
        </div>
        
        {/* Email Input Field */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email:</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} // Update the email state on input change
            required // Make this field required
            placeholder="Enter your email" // Placeholder text for better UX
          />
        </div>
        
        {/* Password Input Field */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Password:</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Update the password state on input change
            required // Make this field required
            placeholder="Enter your password" // Placeholder text for better UX
          />
        </div>
        
        {/* Submit Button */}
        <div className="text-center">
          <button 
            className="btn btn-primary fw-bold px-4 py-2" 
            type="submit" // Specify the button type as submit
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
