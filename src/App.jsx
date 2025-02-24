import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login/Login';
import Signup from './Login/Signup';
import Dashboard from './dashboard/Dashboard';
import './App.css';
import ProtectedRoute from './helper/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for auth status on app load
  // useEffect(() => {
  //   const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
  //   setIsAuthenticated(storedAuth);
  // }, []);

  // Handle logout
  // const handleLogout = () => {
  //   localStorage.removeItem('isAuthenticated');
  //   setIsAuthenticated(false);
  // };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={<Login  />} 
          />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
          <Route path="/" element={<Login  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
