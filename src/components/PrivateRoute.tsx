import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Check if token exists

  return isAuthenticated ? element : <Navigate to="/login" replace/>;
};

export default PrivateRoute;
