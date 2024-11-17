import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/Navigation.module.scss';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideMenuRoutes = ['/login','/register'];

   // Función para cerrar sesión
  const handleSignOut = () => {
    localStorage.removeItem('token'); // Delete token
    navigate('/login'); // Go login
  };

  return (
    <div className={styles.container}>
      {!hideMenuRoutes.includes(location.pathname) && (
        <nav className={styles.navbar}>
        	<div className={styles.logo}>Zenith</div>
        	<div className={styles.menu}>
        		<Link to="/welcome" className={styles.menuItem}>Home</Link><br />
            <Link to="/profile" className={styles.menuItem}>Profile</Link><br />
          	<Link to="/tasks" className={styles.menuItem}>Tasks</Link><br />
            <a href="/login" onClick={handleSignOut} className={styles.menuItem}>Sign Out</a>
        	</div>
        </nav>
      )}
    </div>
  );
};

export default Navigation;