import React, { useState, useEffect } from 'react';
import '../pages/GamePage.css'; 
const TwoPlayerGame = () => {
  const initialBoard = Array(8).fill().map(() => Array(8).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('black');
  const [showGameOverMessage, setShowGameOverMessage] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [scores, setScores] = useState({ black: 2, white: 2 }); // Initial scores

  useEffect(() => {
    // Initialize the central four discs
    const newBoard = Array(8).fill().map(() => Array(8).fill(null));
    newBoard[3][3] = newBoard[4][4] = 'white';
    newBoard[3][4] = newBoard[4][3] = 'black';
    setBoard(newBoard);
    setInitialRender(false);
  }, []);

  const handleCellClick = (row, col) => {
    if (!showGameOverMessage && isValidMove(row, col)) {
      const opponent = getOpponentPlayer();
      const newBoard = board.map(row => [...row]);
      const directions = [
        { row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 },
        { row: -1, col: -1 }, { row: -1, col: 1 }, { row: 1, col: -1 }, { row: 1, col: 1 },
      ];

      for (const direction of directions) {
        let i = row + direction.row;
        let j = col + direction.col;
        let flips = [];

        while (i >= 0 && i < 8 && j >= 0 && j < 8) {
          if (newBoard[i][j] === opponent) {
            flips.push({ row: i, col: j });
          } else if (newBoard[i][j] === currentPlayer && flips.length > 0) {
            flips.forEach(flip => (newBoard[flip.row][flip.col] = currentPlayer));
            break;
          } else {
            break;
          }

          i += direction.row;
          j += direction.col;
        }
      }

      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
      updateScores(newBoard); // Update scores
    }
  };

  const getOpponentPlayer = () => (currentPlayer === 'black' ? 'white' : 'black');

  const isValidMove = (row, col) => {
    if (board[row][col]) {
      return false; // Cell is not empty
    }

    const opponent = getOpponentPlayer();
    const directions = [
      { row: -1, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }, { row: 0, col: 1 },
      { row: -1, col: -1 }, { row: -1, col: 1 }, { row: 1, col: -1 }, { row: 1, col: 1 },
    ];

    for (const direction of directions) {
      let i = row + direction.row;
      let j = col + direction.col;
      let foundOpponent = false;

      while (i >= 0 && i < 8 && j >= 0 && j < 8) {
        if (board[i][j] === opponent) {
          foundOpponent = true;
        } else if (board[i][j] === currentPlayer && foundOpponent) {
          return true; // Valid move
        } else {
          break;
        }

        i += direction.row;
        j += direction.col;
      }
    }

    return false;
  };

  const updateScores = (newBoard) => {
    const scoresObject = { black: 0, white: 0 };

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (newBoard[i][j] === 'black') {
          scoresObject.black++;
        } else if (newBoard[i][j] === 'white') {
          scoresObject.white++;
        }
      }
    }

    setScores(scoresObject);
  };

  useEffect(() => {
    if (!initialRender) {
      // Check for game over condition (no available moves for both players)
      const blackMovesAvailable = board.some((row, i) =>
        row.some((cell, j) => cell === null && isValidMove(i, j))
      );

      const whiteMovesAvailable = board.some((row, i) =>
        row.some((cell, j) => cell === null && isValidMove(i, j))
      );

      if (!blackMovesAvailable && !whiteMovesAvailable) {
        setShowGameOverMessage(true);
      }
    }
  }, [board, showGameOverMessage, initialRender, currentPlayer]);

  return (
    <div className="othello-container bg-green-100/50 shadow -md">
      <div className="othello-profile black-profile">
        <div className="othello-disc black-disc" />
        <p className='px-4 text-purple-500 border-1 border-l-2 border-black py-3 font-bold '>Black Turn</p>
        <p className='px-4 font-light text-2xl'>Black Score: {scores.black}</p>
      </div>

      <div className="othello-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="othello-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`othello-cell ${isValidMove(rowIndex, colIndex) ? 'valid-move' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell && <div className={`othello-piece ${cell}`} />}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="othello-profile white-profile">

        <div className="othello-disc white-disc" />
        <p className='px-4 text-purple-900 border-1 border-l-2 border-gray-200 py-3 font-bold'>Black Turn</p>
        <p className='px-4 font-bold text-2xl'>White Score: {scores.white}</p>
      </div>

      {showGameOverMessage && <p className="othello-game-over">Game Over!</p>}
    </div>
  );
};

export default TwoPlayerGame;