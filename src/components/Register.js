// Register.js (Update the user icons to use the provided Imgur links)
import { useState } from 'react';
import axios from 'axios';

const userIcons = [
  'https://i.ibb.co/BG9HQDT/Muffin-Man.png',
  'https://i.ibb.co/37mdS42/Mixer.png',
  'https://i.ibb.co/6g3JZCW/Cupcake.png',
  'https://i.ibb.co/RSMzPrh/Bread.png'
];


{/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/BG9HQDT/Muffin-Man.png" alt="Muffin-Man" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/37mdS42/Mixer.png" alt="Mixer" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/6g3JZCW/Cupcake.png" alt="Cupcake" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/RSMzPrh/Bread.png" alt="Bread" border="0"></a> */}

const Register = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const icon = userIcons[Math.floor(Math.random() * userIcons.length)];
    axios.post('http://localhost:4000/api/register', {email,password,name,icon})
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      window.location.href = '/';
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center fw-bold mb-4" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem' }}>
        Register
      </h3>
      <form onSubmit={handleRegister} className="border rounded p-4 shadow-sm bg-light" style={{maxWidth:'400px', margin:'0 auto'}}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Name:</label>
          <input type="text" className="form-control" 
            value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>
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
          <button className="btn btn-primary fw-bold px-4 py-2" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
