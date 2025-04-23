import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import PropTypes from 'prop-types';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);  // Added loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.username || !formData.password) {
      toast.error('Username and password are required!');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('token', data.token);  // Store token
        setIsAuthenticated(true);
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Invalid username or password');
      }
    } catch (error) {
      toast.error('Network error, please try again later.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <ToastContainer />
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

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