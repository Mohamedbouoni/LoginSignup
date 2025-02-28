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
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.username || !formData.password) {
      toast.error('Username and password are required!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
        setIsAuthenticated(true);
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Server error');
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
