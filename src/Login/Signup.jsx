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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.username || !formData.password || !formData.confirmPassword) {
      toast.error('All fields are required!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    // Check if the username already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.username === formData.username);
    if (existingUser) {
      toast.error('Username already exists!');
      return;
    }

    // Save the new user to localStorage
    const newUser = { fullname: formData.fullname, username: formData.username, password: formData.password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    toast.success('Account created successfully!');
    navigate('/login'); // Redirect to the login page
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