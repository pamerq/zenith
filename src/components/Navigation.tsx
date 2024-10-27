import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Navigation.module.scss';

const Navigation: React.FC = () => {
  const location = useLocation();
  const hideMenuRoutes = ['/login'];

  return (
    <div className={styles.container}>
      {!hideMenuRoutes.includes(location.pathname) && (
        <nav className={styles.navbar}>
        	<div className={styles.logo}>Zenith</div>
        	<div className={styles.menu}>
        		<Link to="/" className={styles.menuItem}>Home</Link><br />
          		<Link to="/tasks" className={styles.menuItem}>Tasks</Link><br />
          		<Link to="/login" className={styles.menuItem}>Login</Link>
        	</div>
        </nav>
      )}
    </div>
  );
};

export default Navigation;