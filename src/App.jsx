import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login/Login';
import Signup from './Login/Signup';
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './helper/ProtectedRoute';
import './App.css';
import UserProfile from './pages/UserProfile';
import Candidate from './styles/Candidate';
import Departments from './pages/Departments';
import Employees from './pages/Employees';
import LeaveRequets from './pages/LeaveRequets';
import Recruitment from './pages/Recruitment';
import Settings from './pages/Settings';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check localStorage for auth status on app load
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(storedAuth);
    setLoading(false); // Stop loading after check
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; // Optional loading screen
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
          />

          {/* Protected dashboard */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />}
          />

          {/* Dynamic user profile route */}
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/employees" element={<Employees />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/leave-requests" element={<LeaveRequets />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/settings" element={<Settings />} />

          {/* Catch all unmatched routes */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

          {/* Default route */}
          <Route path="/" element={<Candidate/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
