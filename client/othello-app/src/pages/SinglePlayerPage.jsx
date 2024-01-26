// SinglePlayerPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SinglePlayerGame from '../components/SinglePlayerGame';

const SinglePlayerPage = () => {
  return (
    <Routes>
            <Route path="/" element={<SinglePlayerGame />} />
    </Routes>
  );
};

export default SinglePlayerPage;
