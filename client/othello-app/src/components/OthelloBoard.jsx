import React, { useState, useEffect } from "react";
import "../pages/GamePage.css";

const OthelloBoard = () => {
  const initialBoard = Array(8)
    .fill()
    .map(() => Array(8).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("black");
  const [showGameOverMessage, setShowGameOverMessage] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [scores, setScores] = useState({ black: 2, white: 2 }); // Initial scores

  useEffect(() => {
    const newBoard = Array(8)
      .fill()
      .map(() => Array(8).fill(null));
    newBoard[3][3] = newBoard[4][4] = "white";
    newBoard[3][4] = newBoard[4][3] = "black";
    setBoard(newBoard);
    setInitialRender(false);
  }, []);

  useEffect(() => {
    if (currentPlayer === "white" && !showGameOverMessage) {
      setTimeout(() => {
        makeComputerMove();
      }, 500); // Adjust the delay as needed
    }
  }, [currentPlayer, showGameOverMessage]);

  const handleCellClick = (row, col) => {
    if (
      !showGameOverMessage &&
      currentPlayer === "black" &&
      isValidMove(row, col)
    ) {
      makeMove(row, col);
    }
  };

  const makeMove = (row, col) => {
    const opponent = currentPlayer === "black" ? "white" : "black"; // Determine opponent based on current player
    const newBoard = board.map((row) => [...row]);
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 },
    ];

    for (const direction of directions) {
      let i = row + direction.row;
      let j = col + direction.col;
      let flips = [];

      while (i >= 0 && i < 8 && j >= 0 && j < 8) {
        if (newBoard[i][j] === opponent) {
          flips.push({ row: i, col: j });
        } else if (newBoard[i][j] === currentPlayer && flips.length > 0) {
          flips.forEach(
            (flip) => (newBoard[flip.row][flip.col] = currentPlayer)
          );
          break;
        } else {
          break;
        }

        i += direction.row;
        j += direction.col;
      }
    }

    newBoard[row][col] = currentPlayer;

    setTimeout(() => {
      setBoard(newBoard);
      updateScores(newBoard);
      switchPlayer();
    }, 500); // Adjust the delay as needed for the entry animation
  };

  const makeComputerMove = () => {
    const availableMoves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (isValidMove(i, j)) {
          availableMoves.push({ row: i, col: j });
        }
      }
    }

    if (availableMoves.length > 0) {
      const randomMove =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      makeMove(randomMove.row, randomMove.col);
    }
  };

  const isValidMove = (row, col) => {
    if (board[row][col] !== null) {
      return false; // Cell is not empty, invalid move
    }

    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 },
    ];

    // Check each direction for valid moves
    for (const direction of directions) {
      let i = row + direction.row;
      let j = col + direction.col;
      let foundOpponent = false;

      while (i >= 0 && i < 8 && j >= 0 && j < 8) {
        if (board[i][j] === currentPlayer) {
          if (foundOpponent) {
            return true; // Found a valid move
          } else {
            break; // No opponent pieces in between, invalid move
          }
        } else if (board[i][j] === null) {
          break; // Empty cell, stop searching in this direction
        } else {
          foundOpponent = true; // Found opponent's piece
        }

        i += direction.row;
        j += direction.col;
      }
    }

    return false; // No valid move found in any direction
  };

  const updateScores = (newBoard) => {
    const scoresObject = { black: 0, white: 0 };

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (newBoard[i][j] === "black") {
          scoresObject.black++;
        } else if (newBoard[i][j] === "white") {
          scoresObject.white++;
        }
      }
    }

    setScores(scoresObject);
  };

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
  };

  useEffect(() => {
    if (!initialRender) {
      const blackMovesAvailable = board.some((row, i) =>
        row.some((cell, j) => cell === null && isValidMove(i, j, "black"))
      );

      const whiteMovesAvailable = board.some((row, i) =>
        row.some((cell, j) => cell === null && isValidMove(i, j, "white"))
      );

      if (!blackMovesAvailable && !whiteMovesAvailable) {
        setShowGameOverMessage(true);
      } else {
        setShowGameOverMessage(false); // Reset game over message if moves are available
      }
    }
  }, [board, showGameOverMessage, initialRender]);

  return (
    <div className="othello-container bg-black text-white mt-3">
      <style>
        {`
          .othello-cell {
            position: relative;
            transition: background-color 0.3s ease-in-out;
          }

          .valid-move {
            background-color: rgba(0, 255, 0, 0.5);
          }

          .othello-piece {
            position: absolute;
            animation-duration: 0.5s;
          }

          @keyframes discEntry {
            from {
              transform: scale(0);
            }
            to {
              transform: scale(1);
            }
          }

          .black-disc {
            animation-name: discEntry;
          }

          .white-disc {
            animation-name: discEntry;
          }

          @keyframes discFlip {
            from {
              transform: rotateY(0deg);
            }
            to {
              transform: rotateY(180deg);
            }
          }

          .othello-piece.black {
            animation: discFlip 0.5s ease-in-out;
          }

          .othello-piece.white {
            animation: discFlip 0.5s ease-in-out;
          }
        `}
      </style>

      <div className="othello-profile black-profile">
        <div className="othello-disc black-disc" />
        <p className="px-4 text-purple-500 border-1 border-l-2 border-gray-200 py-3 font-bold">
          Black Turn
        </p>
        <p className="px-3 sm:text-2xl font-light">
          Black Score: {scores.black}
        </p>
      </div>

      <div className="othello-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="othello-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`othello-cell ${
                  isValidMove(rowIndex, colIndex) ? "valid-move" : ""
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell && <div className={`othello-piece ${cell}`} />}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="othello-profile white-profile ">
        <div className="othello-disc white-disc " />
        <p className="px-4 text-red-500 border-1 border-l-2 border-gray-200 py-3 font-bold">
          Computer's Turn
        </p>
        <p className="px-3 font-bold sm:text-2xl">
          White Score: {scores.white}
        </p>
      </div>

      {showGameOverMessage && <p className="othello-game-over">Game Over!</p>}
    </div>
  );
};

export default OthelloBoard;
