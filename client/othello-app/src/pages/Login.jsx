import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css"; // Make sure to import your stylesheet

function Login() {
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleCheckboxChange = () => {
    setKeepSignedIn(!keepSignedIn);
  };

  return (
    <div id="bd" className="login-box">
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
        <Link to="/login" className="submit-btn">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </Link>
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

export default Login;
