import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import CustomAlert from './CustomAlert';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setKeepSignedIn(!keepSignedIn);
  };

  const handleLogin = async () => {
    setLoggingIn(true);

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        setLoginSuccess(true);
      } else {
        const data = await response.json();
        setAlertMessage(`Login failed: ${data.message}`);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoggingIn(false);
    }
  };

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if (loginSuccess) {
        navigate('/game');
      }
    }, 1000);

    return () => clearTimeout(redirectTimeout);
  }, [loginSuccess, navigate]);

  return (
    <div id="bd" className="login-box" style={{ backgroundColor: '#add8e6' }}>
      {!loginSuccess ? (
        <form>
          <div className="user-box">
            <input
              type="text"
              name="username"
              autoComplete="off"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="keep-signed-in-box">
            <label className="checkbox-label">
              <input
                type="checkbox"
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={handleCheckboxChange}
              />
              <span className="custom-checkbox"></span>
              Keep me signed in
            </label>
          </div>
          <button
            className="submit-btn btn-6"
            onClick={handleLogin}
            disabled={loggingIn}
          >
            <span>
              {loggingIn ? 'Logging in...' : 'Log In'}
              <div className="btn-line"></div>
              <div className="btn-line"></div>
              <div className="btn-line"></div>
              <div className="btn-line"></div>
            </span>
          </button>
          <p className="signup-link">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link-text">
              Sign Up
            </Link>
          </p>
        </form>
      ) : (
        <p>Login successful. Redirecting...</p>
      )}
      <CustomAlert
        isOpen={showAlert}
        message={alertMessage}
        onRequestClose={() => setShowAlert(false)}
      />
    </div>
  );
}

export default Login;
