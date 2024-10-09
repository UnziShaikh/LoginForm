// src/LoginForm.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
            setIsLoggedIn(true);
            setMessage('Login successful!');
        } else {
            setMessage('Invalid username or password');
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // Store username and password in local storage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        setMessage('Signup successful! You can now log in.');
        setIsSignUpMode(false); // Switch back to login mode
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
        setMessage('You have logged out.');
    };

    return (
        <div className="login-form">
            <h2>
                <FontAwesomeIcon icon={faUser} /> {isSignUpMode ? 'Sign Up' : 'Login'}
            </h2>
            <form onSubmit={isSignUpMode ? handleSignup : handleLogin}>
                <div>
                    <label>
                        <FontAwesomeIcon icon={faUser} /> Username:
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>
                        <FontAwesomeIcon icon={faLock} /> Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isSignUpMode ? 'Sign Up' : 'Login'}</button>
            </form>
            <p>{message}</p>
            {!isLoggedIn ? (
                <>
                    <button onClick={() => setIsSignUpMode(!isSignUpMode)}>
                        {isSignUpMode ? 'Back to Login' : 'Create an Account'}
                    </button>
                </>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </div>
    );
};

export default LoginForm;
