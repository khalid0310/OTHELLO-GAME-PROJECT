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
  const [winner, setWinner] = useState(null);

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

      fetch("http://localhost:4000/othello/make_move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          row,
          col,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error making move:", error);
        });
    }
  };

  const makeMove = (row, col) => {
    const opponent = currentPlayer === "black" ? "white" : "black";
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
      return false;
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

    for (const direction of directions) {
      let i = row + direction.row;
      let j = col + direction.col;
      let foundOpponent = false;

      while (i >= 0 && i < 8 && j >= 0 && j < 8) {
        if (board[i][j] === currentPlayer) {
          if (foundOpponent) {
            return true;
          } else {
            break;
          }
        } else if (board[i][j] === null) {
          break;
        } else {
          foundOpponent = true;
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
        const winnerMessage =
          scores.black > scores.white
            ? "Black Wins!"
            : scores.white > scores.black
            ? "White Wins!"
            : "It's a Tie!";
        setWinner(winnerMessage);
        setShowGameOverMessage(true);
      } else {
        setShowGameOverMessage(false);
      }
    }
  }, [board, showGameOverMessage, initialRender, scores]);

  const handleResetGame = () => {
    const newBoard = Array(8)
      .fill()
      .map(() => Array(8).fill(null));
    newBoard[3][3] = newBoard[4][4] = "white";
    newBoard[3][4] = newBoard[4][3] = "black";
    setBoard(newBoard);
    setInitialRender(false);
    setScores({ black: 2, white: 2 });
    setCurrentPlayer("black");
    setShowGameOverMessage(false);
    setWinner(null);
  };

  const handleGoBack = () => {
    // Implement the logic to go back to the previous screen or step
    // For example, you can use react-router-dom to navigate back
    // Replace the following line with the actual logic for going back
    console.log("Go back logic goes here");
  };

  return (
    <div className="othello-container bg-black text-white mt-3">
      <style>
        {`
          /* Existing styles (add or modify as needed) */
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
          
          .othello-buttons {
            display: flex;
            margin-top: 10px; /* Adjust the margin as needed for spacing */
          }

          .othello-reset-button, .othello-goback-button {
            background-color: #3498db;
            color: #fff;
            padding: 10px;
            border: none;
            margin: 0;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            margin-right: 10px; /* Adjust the margin as needed for spacing */
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

      {showGameOverMessage && <p className="othello-game-over">{winner}</p>}

      {/* Reset and Go Back buttons */}
      <div className="othello-buttons">
        <button className="othello-reset-button" onClick={handleResetGame}>
          Reset Game
        </button>
        <div className="othello-button-spacing" />
        <button className="othello-goback-button" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default OthelloBoard;
