import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; 
import styles from '../styles/Login.module.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      //console.log("Email:", email);
	    //console.log("Password:", password);
      const response = await axios.post('/users/login', { email, password });
      //console.log(response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token
        navigate('/profile'); // Redirige a la página de bienvenida
      } else {
        setError('Login failed');
      }
    } catch (err: any) {
      setError('Login failed. Please check your credentials.');
      console.error("Error details:", err.response ? err.response.data : err.message);
    }
  };

  const handleRedirectToRegister = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Welcome</h1>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <label>
        	Email address:
        </label>
        <input type="email" placeholder="Email" value={email} 
        	onChange={(e) => setEmail(e.target.value)} required />
      	<label>
        	Password:
        </label>
        <input type="password" placeholder="Password" value={password} 
        	onChange={(e) => setPassword(e.target.value)} required />
      	
        <button type="submit" className={styles.button}>Login</button>
      </form>
      <button className={styles.button} onClick={handleRedirectToRegister} >Register</button>
      {error && <div className={styles.errorMessage}>Error: {error}</div>}
    </div>
  );
};

export default Login;
