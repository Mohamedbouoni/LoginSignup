import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { FaMoon, FaSun } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:5000/api/user/${userId}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error("Error fetching user:", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="card-profile">
        <div className="top-left">
      <button className="back-button" onClick={() => navigate('/dashboard')}>⬅ Back to Dashboard</button>
    </div>

      <div className="dark-toggle">
        {darkMode ? <FaSun /> : <FaMoon />}
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <h2>User Profile</h2>
      <div className="Profile">
        {user.image && (
          <img src={`http://localhost:5000/${user.image}`} alt="Profile" className="profile-image" />
        )}
        <p><strong>Full Name:</strong> {user.fullname}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <div className="profile-actions">
          <button onClick={() => navigate(`/edit-profile/${user._id}`)}>Edit Profile</button>
          <button onClick={() => navigate(`/change-password/${user._id}`)}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
