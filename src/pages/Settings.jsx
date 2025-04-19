import React, { useState, useEffect } from "react";
import "./Settings.css";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaUserCircle, FaBell, FaMoon, FaSun } from "react-icons/fa";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div className={`settings-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Topbar */}
      <div className="settings-topbar">
        <Link to="/dashboard" className="back-button">
          <FaArrowLeft className="back-icon" />
          Back
        </Link>

        {/* Dark Mode Toggle */}
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
      </div>

      {/* Header */}
      <div className="settings-header">
        <h1>Settings Panel</h1>
        <p>Adjust your account and application preferences.</p>
      </div>

      {/* Main Settings Content */}
      <div className="settings-content">
        {/* Left Profile Card */}
        <div className="profile-section">
          <FaUserCircle className="profile-avatar" />
          <h2>John Doe</h2>
          <p>Administrator</p>
          <button className="logout-button">Logout</button>
        </div>

        {/* Right Form Section */}
        <div className="form-section">
          <h2>Account Details</h2>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="john.doe@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>

          <h2>Preferences</h2>

          <div className="toggle-item">
            <FaBell className="toggle-icon" />
            <span>Notifications</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="button-group">
            <button className="save-button" onClick={handleSave}>
              Save Changes
            </button>
            <button className="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;