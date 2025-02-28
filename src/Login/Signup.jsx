import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullname: '', username: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.fullname || !formData.username || !formData.password || !formData.confirmPassword) {
      toast.error('All fields are required!');
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: formData.fullname,
          username: formData.username,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success('Account created successfully!');
        navigate('/login');
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
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Full Name</label>
          <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} />

          <label>Username</label>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />

          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />

          <button type="submit">Signup</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;