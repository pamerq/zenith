import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; // Asegúrate de que el path sea correcto

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Email:", email);
	  console.log("Password:", password);
      const response = await axios.post('/users/login', { email, password });
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token
        navigate('/welcome'); // Redirige a la página de bienvenida
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
  	  console.error("Error details:", err.response ? err.response.data : err.message);
   }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
        	Email:
        	<input type="email" placeholder="Email" value={email} 
        	onChange={(e) => setEmail(e.target.value)} required />
      	</label>
      	<br></br>
      	<label>
        	Password:
        	<input type="password" placeholder="Password" value={password} 
        	onChange={(e) => setPassword(e.target.value)} required />
      	</label>
      	<br></br>
        <button type="submit">Login</button>
      </form>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Login;
