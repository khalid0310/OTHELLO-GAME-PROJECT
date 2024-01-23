import React, { useEffect, useRef, useState } from "react";
import "./signup.css";

const SignupPage = () => {
  const divRef = useRef(null);
  const [playerName, setPlayerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  useEffect(() => {
    animateWelcomeScreen();

    return () => {
      // Clear any intervals, timeouts, or other cleanups
    };
  }, []);

  const animateWelcomeScreen = () => {
    const welcomeLogin = document.getElementById("terminal");
    welcomeLogin.style.opacity = "1";
    welcomeLogin.style.top = `50%`;
    welcomeLogin.style.left = `50%`;

    const messages = [
      "Welcome to Othello GAME, also known as Reversi.",
      "Please sign up to play the game",
      "Have fun! 😊",
    ];

    let messageIndex = 0;
    let charIndex = 0;

    const typeText = () => {
      if (messageIndex < messages.length) {
        const currentMessage = messages[messageIndex];
        if (charIndex < currentMessage.length) {
          divRef.current.innerHTML = currentMessage.slice(0, charIndex + 1);
          charIndex++;
          setTimeout(typeText, 70);
        } else {
          messageIndex++;
          charIndex = 0;
          setTimeout(typeText, 1500);
        }
      } else {
        const signupForm = document.getElementById("signup-form");
        signupForm.style.opacity = "1";
      }
    };

    typeText();
  };

  const handleSignup = () => {
    if (
      playerName.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      setSigningUp(true);
      // Implement your signup logic here
      // Example: You can make an API call to register the user
      // Once the signup is successful, you can redirect to another page
    }
  };

  return (
    <div id="dy">
      <div ref={divRef} id="terminal">
        <div>
          <br />
          <span id="blinking">_</span>
        </div>
      </div>

      <div id="signup-form">
        <h1>Signup to Play</h1>
        <input
          type="text"
          placeholder="Hacker nickname"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleSignup} disabled={signingUp}>
          {signingUp ? "Signing up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
