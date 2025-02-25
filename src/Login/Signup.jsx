<<<<<<< HEAD
import React, { useState } from 'react';
import './Login.css';

const Signup = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsPasswordMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setIsPasswordMatch(e.target.value === password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='container'>
            <div className='card'>
                <h1>Signup</h1>
                <form onSubmit={handleSubmit} className='form'>
                    <label>Full Name</label>
                    <input className='fullname' type='text' placeholder='Full Name' required />
                    
                    <label>Username</label>
                    <input className='username' type='text' placeholder='Username' required />
                    
                    <label>Password</label>
                    <input
                        className='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    
                    <label>Confirm Password</label>
                    <input
                        className='confirm-password'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    {!isPasswordMatch && (
                        <p className='error'>Passwords do not match</p>
                    )}
                    <button type='submit' disabled={!isPasswordMatch}>Signup</button>
                </form>
            </div>
        </div>
    );
=======
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Signup = () => {
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

    toast.success('Account created successfully!');
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
>>>>>>> 6cbdc18 (Initial commit: Login and Signup components yessin verssion)
};

export default Signup;
