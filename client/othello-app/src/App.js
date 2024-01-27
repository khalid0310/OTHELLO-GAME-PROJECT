// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Signup from './pages/signup';
import SinglePlayerPage from './pages/SinglePlayerPage';
import TwoPlayerPage from './pages/TwoPlayerPage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Router>
      <div className="App mx-8">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/single-player/*" element={<SinglePlayerPage />} />
          <Route path="/two-player/*" element={<TwoPlayerPage />} />
          <Route path="/game/*" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
