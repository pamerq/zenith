import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const hideMenuRoutes = ['/login'];

  return (
    <div className="container">
      {!hideMenuRoutes.includes(location.pathname) && (
        <nav>
          <Link to="/">Home</Link><br />
          <Link to="/tasks">Tasks</Link><br />
          <Link to="/login">Login</Link>
        </nav>
      )}
    </div>
  );
};

export default Navigation;