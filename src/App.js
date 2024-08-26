import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Tasks from './components/Tasks';
import Login from './components/Login';
import Welcome from './components/Welcome';
import './App.css'; //

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link><br></br>
          <Link to="/tasks">Tasks</Link><br></br>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
