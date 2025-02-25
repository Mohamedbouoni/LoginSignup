import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import PropTypes from 'prop-types';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error('Username and password are required!');
      return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === formData.username && user.password === formData.password);

    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      toast.success('Login successful!');
      navigate('/dashboard'); // Redirect to the dashboard
    } else {
      toast.error('Invalid credentials!');
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />

          <button type="submit">Login</button>

          <p className="signup-link">
            Dont have an account? <Link to="/signup">Go to Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
