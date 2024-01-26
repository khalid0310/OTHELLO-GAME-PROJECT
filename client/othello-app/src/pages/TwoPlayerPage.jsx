// TwoPlayerPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TwoPlayerGame from '../components/TwoPlayerGame';

const TwoPlayerPage = () => {
  return (
    <Routes>
      <Route path="/" element={<TwoPlayerGame />} />
    </Routes>
  );
};

export default TwoPlayerPage;

