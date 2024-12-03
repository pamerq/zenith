import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Tasks from './components/Tasks';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Profile from './components/Profile'; 
import TaskDetail from './components/TaskDetail'; 
import Navigation from './components/Navigation'; 
import PrivateRoute from './components/PrivateRoute'; 

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} /> {/* Protect Profile */}
        <Route path="/welcome" element={<PrivateRoute element={<Welcome />} />} /> {/* Protect Profile */}
        <Route path="/tasks" element={<PrivateRoute element={<Tasks />} />} /> {/* Protect Profile */}
        <Route path="/tasks/:taskId" element={<TaskDetail />} />
        {/* Redirige a la página de login si intentan acceder a la raíz */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
