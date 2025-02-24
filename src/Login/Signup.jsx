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
};

export default Signup;
