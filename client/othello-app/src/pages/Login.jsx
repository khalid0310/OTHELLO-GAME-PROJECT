// Import statements
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"; // Make sure to import your stylesheet
import GamePage from "./GamePage";

// Login component
function Login() {
  // State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate(); // Change this line

  // Functions
  const handleCheckboxChange = () => {
    setKeepSignedIn(!keepSignedIn);
  };

  const handleLogin = async () => {
    setLoggingIn(true);

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // Login successful, redirect to the "/game" route
        navigate("/game"); // Replace "/game" with the desired route
      } else {
        const data = await response.json();
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoggingIn(false);
    }
  };

  // JSX
  return (
    <div id="bd" className="login-box">
      <form>
        <div className="user-box">
          <input
            type="text"
            name="username"
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
          type="button"
          className="signup-btn" // Use the same class as the signup button
          onClick={handleLogin}
          disabled={loggingIn}
        >
          {loggingIn ? "Logging in..." : "Log In"}
        </button>
        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link-text">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

// Export statement
export default Login;
