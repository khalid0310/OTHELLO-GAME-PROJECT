import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SinglePlayerPage from './SinglePlayerPage';
import TwoPlayerPage from './TwoPlayerPage';

function GamePage() {
  return (
    <div>
      <h1>Game Page</h1>
      <div>
        <Link to="/game/singleplayer">Single Player</Link>{' '}
        <Link to="/game/twoplayer">Two Player</Link>
      </div>
      <Routes>
        <Route path="/singleplayer" element={<SinglePlayerPage />} />
        <Route path="/twoplayer" element={<TwoPlayerPage />} />
      </Routes>
    </div>
  );
}

export default GamePage;
