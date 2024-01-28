import React, { useState, useEffect, useCallback } from "react";
import "../pages/GamePage.css";

const TwoPlayerGame = () => {
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

  const memoizedHandleCellClick = useCallback(
    (row, col) => handleCellClick(row, col),
    [board, currentPlayer, showGameOverMessage, initialRender]
  );

  const memoizedIsValidMove = useCallback(
    (row, col) => isValidMove(row, col),
    [board, currentPlayer]
  );

  const memoizedUpdateScores = useCallback(() => updateScores(board), [board]);

  const handleCellClick = (row, col) => {
    if (!showGameOverMessage && memoizedIsValidMove(row, col)) {
      const opponent = getOpponentPlayer();
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
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
      memoizedUpdateScores();

      // Make move on the server
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

  const getOpponentPlayer = () =>
    currentPlayer === "black" ? "white" : "black";

  const isValidMove = (row, col) => {
    if (board[row][col]) {
      return false; // Cell is not empty
    }

    const opponent = getOpponentPlayer();
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
        if (newBoard[i][j] === "black") {
          scoresObject.black++;
        } else if (newBoard[i][j] === "white") {
          scoresObject.white++;
        }
      }
    }

    setScores(scoresObject);
  };

  const resetGame = () => {
    const newBoard = Array(8)
      .fill()
      .map(() => Array(8).fill(null));
    newBoard[3][3] = newBoard[4][4] = "white";
    newBoard[3][4] = newBoard[4][3] = "black";
    setBoard(newBoard);
    setCurrentPlayer("black");
    setShowGameOverMessage(false);
    setScores({ black: 2, white: 2 });
    setInitialRender(false);
  };

  const goBack = () => {
    // Implement the logic to go back (if applicable)
    console.log("Go back functionality");
  };

  useEffect(() => {
    if (!initialRender) {
      const blackMovesAvailable = board.some((row, i) =>
        row.some((cell, j) => cell === null && memoizedIsValidMove(i, j))
      );

      const whiteMovesAvailable = board.some((row, i) =>
        row.some((cell, j) => cell === null && memoizedIsValidMove(i, j))
      );

      if (!blackMovesAvailable && !whiteMovesAvailable) {
        setShowGameOverMessage(true);
      }
    }
  }, [board, showGameOverMessage, initialRender, currentPlayer]);

  return (
    <div className="othello-container bg-green-100/50 shadow -md">
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
            margin-top: 10px;
          }

          .othello-button {
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

          .othello-button-space {
            flex: 1; /* This will create space between buttons */
          }
        `}
      </style>

      <div className="othello-profile black-profile">
        <div className="othello-disc black-disc" />
        <p className="px-4 text-purple-500 border-1 border-l-2 border-black py-3 font-bold">
          {currentPlayer === "black" ? "Black Turn" : "White Turn"}
        </p>
        <p className="px-4 font-light text-2xl">
          {currentPlayer === "black" ? "Black Score" : "White Score"}:{" "}
          {currentPlayer === "black" ? scores.black : scores.white}
        </p>
      </div>

      <div className="othello-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="othello-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`othello-cell ${
                  memoizedIsValidMove(rowIndex, colIndex) ? "valid-move" : ""
                }`}
                onClick={() => memoizedHandleCellClick(rowIndex, colIndex)}
              >
                {cell && <div className={`othello-piece ${cell}`} />}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="othello-profile white-profile">
        <div className="othello-disc white-disc" />
        <p className="px-4 text-purple-900 border-1 border-l-2 border-gray-200 py-3 font-bold">
          {currentPlayer === "white" ? "White Turn" : "Black Turn"}
        </p>
        <p className="px-4 font-bold text-2xl">
          {currentPlayer === "white" ? "White Score" : "Black Score"}:{" "}
          {currentPlayer === "white" ? scores.white : scores.black}
        </p>
      </div>

      <div className="othello-buttons">
        <button className="othello-button" onClick={resetGame}>
          Reset Game
        </button>
        <span className="othello-button-space" />
        <button className="othello-button" onClick={goBack}>
          Go Back
        </button>
      </div>

      {showGameOverMessage && <p className="othello-game-over">Game Over!</p>}
    </div>
  );
};

export default TwoPlayerGame;
