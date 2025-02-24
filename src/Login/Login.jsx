import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

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

    // Simulate login
    // if (formData.username === 'admin' && formData.password === 'password') {
    //   localStorage.setItem('isAuthenticated', 'true');
    //   setIsAuthenticated(true);
    //   toast.success('Login successful!');
    //   navigate('/dashboard');
    // } else {
    //   toast.error('Invalid credentials!');
    // }
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
            value={formData.username} 
            onChange={handleChange} 
          />

          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

// Add PropTypes validation
Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
