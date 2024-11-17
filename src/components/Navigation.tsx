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

  const getActiveClass = (path: string) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <div className={styles.container}>
      {!hideMenuRoutes.includes(location.pathname) && (
        <nav className={styles.navbar}>
        	<div className={styles.logo}>Zenith</div>
        	<div className={styles.menu}>
        		<Link to="/welcome" className={`${styles.menuItem} ${getActiveClass('/welcome')}`}>Home</Link><br />
            <Link to="/profile" className={`${styles.menuItem} ${getActiveClass('/profile')}`}>Profile</Link><br />
          	<Link to="/tasks" className={`${styles.menuItem} ${getActiveClass('/tasks')}`}>Tasks</Link><br />
            <a href="/login" onClick={handleSignOut} className={styles.menuItem}>Sign Out</a>
        	</div>
        </nav>
      )}
    </div>
  );
};

export default Navigation;