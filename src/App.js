import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Tasks from './components/Tasks';
import Login from './components/Login';
import Welcome from './components/Welcome';
import './styles/style.scss';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

const Navigation = () => {
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

export default App;
