import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SinglePlayerPage from "./SinglePlayerPage";
import TwoPlayerPage from "./TwoPlayerPage";
import { FaGamepad, FaUser, FaUserPlus } from "react-icons/fa";

function GamePage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // For older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSignOut = () => {
    navigate("/login");
  };

  const handleAudioClick = () => {
    if (audioRef.current && !audioLoaded) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setAudioLoaded(true);

      // Set the volume to a lower value (e.g., 0.3)
      audioRef.current.volume = 0.075;
    }
  };

  useEffect(() => {
    return () => {
      // Check if audioRef.current is not null before trying to pause
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div>
      <div className="flex gap-2">
        <h1 className="text-4xl ">Game Page</h1>
        <FaGamepad className="text-5xl text-gray-500 font-bold" />
      </div>
      <button
        className="w-[10%] bg-slate-200/20 shadow-inner text-black rounded-full"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
      <div className="flex gap-4 py-4">
        <div
          className="flex items-center gap-3 active:text-red-700 bg-black hover:bg-slate-700 text-white p-4 transition duration-300 ease-in-out transform hover:text-purple-300"
          onClick={handleAudioClick}
        >
          <Link to="/game/singleplayer">Single Player</Link> <FaUser />
        </div>
        <div
          className="flex items-center gap-3 hover:p-4 transition duration-300 ease transform hover:text-purple-600"
          onClick={handleAudioClick}
        >
          <Link to="/game/twoplayer">Two Player</Link>
          <FaUserPlus />
        </div>
      </div>

      <SinglePlayerPage />

      <Routes>
        <Route path="/singleplayer" element={<SinglePlayerPage />} />
        <Route path="/twoplayer" element={<TwoPlayerPage />} />
      </Routes>

      {/* Add an <audio> element for background music without controls */}
      <audio ref={audioRef} loop controls={false}>
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mp3"
        />
        {/* Add additional source elements for different audio formats if needed */}
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
}

export default GamePage;
