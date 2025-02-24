import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className='container'>
            <div className='card'>
                <h1>{isLogin ? 'Login' : 'Signup'}</h1>
                <form action='' method='post' className='auth-form'>
                    {!isLogin && (
                        <>
                            <label>Full Name</label>
                            <input className='fullname' type='text' placeholder='Full Name' />
                        </>
                    )}
                    <label>Username</label>
                    <input className='username' type='text' placeholder='Username' />
                    <label>Password</label>
                    <input className='password' type='password' placeholder='Password' />
                    {!isLogin && (
                        <>
                            <label>Confirm Password</label>
                            <input className='confirm-password' type='password' placeholder='Confirm Password' />
                        </>
                    )}
                    <button type='submit'>{isLogin ? 'Login' : 'Signup'}</button>
                </form>
                <p>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <a href='#' onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Signup' : 'Login'}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
