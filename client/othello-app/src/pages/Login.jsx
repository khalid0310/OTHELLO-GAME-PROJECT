import React, { useState } from "react";
import "./login.css"; // Make sure to import your stylesheet

function Login() {
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleCheckboxChange = () => {
    setKeepSignedIn(!keepSignedIn);
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input type="text" name="" required />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type="password" name="" required />
          <label>Password</label>
        </div>
        <div className="keep-signed-in-box">
          <input
            type="checkbox"
            id="keepSignedIn"
            checked={keepSignedIn}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="keepSignedIn">Keep me signed in</label>
        </div>
        <a href="#" className="submit-btn">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
        <p className="signup-link">
          Don't have an account?{" "}
          <a href="#" className="signup-link-text">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
