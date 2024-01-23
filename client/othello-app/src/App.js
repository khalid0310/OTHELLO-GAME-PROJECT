import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';

function App() {
  return (
    <Router>
      <div className="App mx-8">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/explore" element={<Explore />} />

          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
