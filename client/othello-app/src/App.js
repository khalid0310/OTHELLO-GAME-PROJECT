// App.jsx
import React from 'react';
import './App.css';
import GamingHeroSection from './components/Hero';
import Navbar from './components/Navbar';
import TutorialComponent from './components/Tutorial';
import Video from './components/Video';
import OthelloBoard from './OthelloBoard'; // Import the OthelloBoard component

function App() {
  return (
    <div className="App mx-6">
      <Navbar />
      <GamingHeroSection />
      <Video />
      <TutorialComponent />
      <OthelloBoard /> {/* Include the OthelloBoard component */}
    </div>
  );
}

export default App;
