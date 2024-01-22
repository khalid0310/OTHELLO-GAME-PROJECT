// TutorialComponent.js
import React from 'react';

const TutorialComponent = () => {
  return (
    <div className="flex max-w-3xl mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      {/* Left Column: Tutorial Steps */}
      <div className="w-2/3 pr-8">
        <h2 className="text-3xl font-bold mb-4">How to Play Othello</h2>

        {/* Step 1 */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Step 1: Game Objective</h3>
          <p>
            Othello is a two-player game where the goal is to have the majority of your colored discs on the board at the end of the game.
          </p>
        </div>

        {/* Step 2 */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Step 2: Game Setup</h3>
          <p>
            The game board starts with four discs placed in a square in the center of the grid. Each player takes turns to place one disc at a time.
          </p>
        </div>

        {/* Step 3 */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Step 3: Disc Placement</h3>
          <p>
            To place a disc, click on an empty cell. Your disc will be placed, and any opponent discs that are trapped between your newly placed disc and your other discs will be flipped to your color.
          </p>
        </div>

        {/* Step 4 */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Step 4: Strategy</h3>
          <p>
            Think strategically! Aim to trap your opponent's discs between your own to flip them. Plan several moves ahead to control the board.
          </p>
        </div>

        {/* Step 5 */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Step 5: Winning</h3>
          <p>
            The game ends when the board is full or no player can make a legal move. The player with the most discs of their color on the board wins.
          </p>
        </div>

        {/* Step 6 */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Step 6: Enjoy the Game!</h3>
          <p>
            Now you're ready to play Othello! Click the cells to make your moves and have fun!
          </p>
        </div>
      </div>

      {/* Right Column: Console Image */}
      <div className="w-1/">
        <img
          src="https://images.pexels.com/photos/21067/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600" // Replace with the actual path to your console image
          alt="Game Console"
          className="w-full h-auto rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default TutorialComponent;
