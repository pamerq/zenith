import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; 
import styles from '../styles/Register.module.scss';

const Register: React.FC = () => {
	const [name, setName] = useState<string>('');
	const [lastname, setLastName] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

const handleRegister = async (e: FormEvent) => {
	e.preventDefault();
	setError(null);
  setSuccess(null);

  if (!email.includes('@')) {
    	setError('Please enter a valid email address.');
    	return;
	}

	if (password.length < 6) {
    	setError('Password must be at least 6 characters.');
    	return;
	}

	setIsSubmitting(true);

  try {
    const response = await axios.post('/users/register', {
      		name,
      		lastname,
      		username,
      		email,
      		phone,
      		password,
    });

    	if (response.status === 201) {
      		setSuccess('Registration successful! Redirecting...');
      		setTimeout(() => {
      			setSuccess(null);
        		navigate('/login'); // Redirect to login page after a delay
      		}, 1900);
    	} else {
      		setError('Registration failed. Please try again.');
    	}

    } catch (err: any) {
    	setError(err.response?.data?.message || 'An unexpected error occurred.');
    	console.error("Error details:", err.response ? err.response.data : err.message);
    } finally {
      setIsSubmitting(false); // Habilita nuevamente el botón después de intentar el registro
    }
};

const handleRedirectToLogin = () => {
    navigate('/login'); // Redirige a la página de registro
  };

return (
	<div className={styles.registerContainer}>
	<h1 className={styles.registerTitle}>Create an Account</h1>
	<form className={styles.registerForm} onSubmit={handleRegister}>
		<label>Name:</label>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Last Name:</label>
        <input type="text" placeholder="LastName" value={lastname} onChange={(e) => setLastName(e.target.value)} required />

		<label>Username:</label>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Email address:</label>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
		
		<label>Phone:</label>
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

		<label>Password:</label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit"  disabled={isSubmitting}>Register</button>
	</form>
	<button className={styles.button} onClick={handleRedirectToLogin} >Login</button>
	{error && <div className={styles.errorMessage}>Error: {error}</div>}
  {success && <div className={styles.successMessage}>{success}</div>}
	</div>
	);
};

export default Register;