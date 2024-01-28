import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SinglePlayerPage from "./SinglePlayerPage";
import TwoPlayerPage from "./TwoPlayerPage";
import { FaGamepad, FaUser, FaUserPlus } from "react-icons/fa";

function GamePage() {
  const navigate = useNavigate();

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
    // You can perform any sign-out logic here
    // For now, let's just navigate to the login page
    navigate("/login");
  };

  return (
    <div>
      <div className="flex gap-2">
        <h1 className="text-4xl ">Game Page</h1>
        <FaGamepad className="text-5xl text-gray-500 font-bold" />
      </div>
      <div className="flex gap-4 py-4">
        <div className="flex items-center gap-3 active:text-red-700 bg-black hover:bg-slate-700 text-white p-4 transition duration-300 ease-in-out transform hover:text-purple-300">
          <Link to="/game/singleplayer">Single Player</Link> <FaUser />
        </div>
        <div className="flex items-center gap-3 hover:p-4 transition duration-300 ease transform hover:text-purple-600">
          <Link to="/game/twoplayer">Two Player</Link>
          <FaUserPlus />
        </div>
      </div>

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSignOut}
      >
        Sign Out
      </button>

      <Routes>
        <Route path="/singleplayer" element={<SinglePlayerPage />} />
        <Route path="/twoplayer" element={<TwoPlayerPage />} />
      </Routes>
    </div>
  );
}

export default GamePage;
