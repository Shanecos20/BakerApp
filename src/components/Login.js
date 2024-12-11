// Login.js
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/login', {email,password})
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      window.location.href = '/';
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center fw-bold mb-4" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
        Login
      </h3>
      <form onSubmit={handleLogin} className="border rounded p-4 shadow-sm bg-light" style={{maxWidth:'400px', margin:'0 auto'}}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email:</label>
          <input type="email" className="form-control" 
            value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Password:</label>
          <input type="password" className="form-control" 
            value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <div className="text-center">
          <button className="btn btn-primary fw-bold px-4 py-2" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
