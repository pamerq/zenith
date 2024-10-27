import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Tasks from './components/Tasks';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Navigation from './components/Navigation'; 


const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/tasks" element={<Tasks />} />
        {/* Redirige a la página de login si intentan acceder a la raíz */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
