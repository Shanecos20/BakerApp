// Login.js
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // State hooks to manage email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handler for form submission
   * Sends a POST request to the login API with email and password
   * Stores the returned user data in localStorage and redirects to the home page upon success
   * @param {Event} e - The form submission event
   */
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    axios.post('http://localhost:4000/api/login', { email, password })
      .then(res => {
        // Store user data in localStorage for persistent authentication
        localStorage.setItem('user', JSON.stringify(res.data));
        // Redirect to the home page after successful login
        window.location.href = '/';
      })
      .catch(err => console.log(err)); // Log any errors during the login process
  }

  return (
    <div className="container mt-4">
      {/* Form header */}
      <h3 className="text-center fw-bold mb-4" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
        Login
      </h3>
      
      {/* Login form */}
      <form 
        onSubmit={handleLogin} 
        className="border rounded p-4 shadow-sm bg-light" 
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        {/* Email Input Field */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email:</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your email"
          />
        </div>
        
        {/* Password Input Field */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Password:</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Enter your password"
          />
        </div>
        
        {/* Submit Button */}
        <div className="text-center">
          <button 
            className="btn btn-primary fw-bold px-4 py-2" 
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
