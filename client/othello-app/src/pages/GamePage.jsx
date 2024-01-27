import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SinglePlayerPage from './SinglePlayerPage';
import TwoPlayerPage from './TwoPlayerPage';
import { FaGamepad,FaUser,FaUserPlus } from 'react-icons/fa';

function GamePage() {
  return (
    <div>
      <div className='flex gap-2'>
      <h1 className='text-4xl '>Game Page</h1>
      <FaGamepad className='text-5xl text-gray-500 font-bold'/>
      </div>
      <div className='flex gap-4 py-4'>
        <div className='flex items-center gap-3 active:text-red-700 bg-black hover:bg-slate-700 text-white p-4 transition duration-300 ease-in-out transform hover:text-purple-300' >
        <Link to="/game/singleplayer">Single Player</Link>{' '}
        <FaUser/>
        </div>
        <div className='flex items-center gap-3  hover:p-4 transition duration-300 ease transform hover:text-purple-600'>
        <Link to="/game/twoplayer">Two Player</Link>
        <FaUserPlus/>
        </div>
      </div>
      <SinglePlayerPage />

      <Routes>
        <Route path="/singleplayer" element={<SinglePlayerPage />} />
        <Route path="/twoplayer" element={<TwoPlayerPage />} />
      </Routes>
    </div>
  );
}

export default GamePage;
