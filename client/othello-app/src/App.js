import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from "./pages/Login";
import SignupPage from "./pages/signup";
import GamePage from "./pages/GamePage"; 

function App() {
  return (
    <Router>
      <div className="App mx-8">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/game" element={<GamePage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

