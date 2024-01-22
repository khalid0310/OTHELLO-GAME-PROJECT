import './App.css';
import GamingHeroSection from './components/Hero';
import Navbar from './components/Navbar';
import TutorialComponent from './components/Tutorial';
import Video from './components/Video';

function App() {
  return (
    <div className="App mx-6  ">
      <Navbar />
      <GamingHeroSection />
      <Video />
      <TutorialComponent />
    </div>
  );
}

export default App;
