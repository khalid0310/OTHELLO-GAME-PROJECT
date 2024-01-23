// frontend/src/pages/AboutPage.js
import React from 'react';

const Explore = () => {
  return (
    <div className="about-container max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg">
      <h2 className="text-3xl font-semibold mb-4 text-center">About Othello Game</h2>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">History</h1>
        <p className="text-sm text-gray-700">
          Englishmen Lewis Waterman and John W. Mollett both claim to have invented the game of Reversi in 1883, each denouncing the other as a fraud. The game gained considerable popularity in England at the end of the 19th century. The game's first reliable mention is in the 21 August 1886 edition of The Saturday Review. Later mention includes an 1895 article in The New York Times, which describes Reversi as "something like Go Bang, played with 64 pieces." In 1893, the German games publisher Ravensburger started producing the game as one of its first titles. Two 18th-century continental European books dealing with a game that may or may not be Reversi are mentioned on page fourteen of the Spring 1989 Othello Quarterly, and there has been speculation, so far without documentation, that the game has older origins. [citation needed]

          A Japanese publication in 1907 titled World Games Rules Complete Collection (世界遊戯法大全) describes the board game Reversi with the same rules as Othello where the first four pieces go in the center in a diagonal pattern and the player who cannot make a move simply passes.
        </p>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Othello</h1>
        <p className="text-sm text-gray-700">
          Othello
          A modern plastic Othello set

          The modern version of the game—the most regularly used rule-set, and the one used in international tournaments—is marketed and recognized as Othello. It was patented in Japan in 1971 by Goro Hasegawa (legal name: Satoshi Hasegawa), then a 38-year-old salesman. Hasegawa initially explained that Othello was an improvement on Reversi, but from around 2000, he began to claim that he invented it in Mito regardless of Reversi. Hasegawa also claims that the origin of Reversi/Othello dates back 5,000 years.

          Hasegawa established the Japan Othello Association in March 1973, and held the first national Othello championship on 4 April 1973 in Japan. The Japanese game company Tsukuda Original launched Othello in late April 1973 in Japan under Hasegawa's license, which led to an immediate commercial success.

          The name was selected by Hasegawa as a reference to the Shakespearean play Othello, the Moor of Venice, referring to the conflict between the Moor Othello and Iago, and more controversially, to the unfolding drama between Othello, who is black, and Desdemona, who is white. The green color of the board is inspired by the image of the general Othello, valiantly leading his battle in a green field. It can also be likened to a jealousy competition (jealousy being the central theme in Shakespeare's play, which popularized the term "green-eyed monster"), since players engulf the pieces of the opponent, thereby turning them to their possession.

          Othello was first launched in the U.S. in 1975 by Gabriel Industries and it also enjoyed commercial success there. Sales have reportedly exceeded $600 million. More than 40 million classic games have been sold in over 100 countries.

          Hasegawa's How to play Othello (Osero No Uchikata) in Japan in 1974, was published in 1977 in an English translation entitled How to Win at Othello.

          Kabushiki Kaisha Othello, which is owned by Hasegawa, registered the trademark "OTHELLO" for board games in Japan; Tsukuda Original registered the trademark in the rest of the world. All intellectual property regarding Othello outside Japan is now owned by MegaHouse, the Japanese toy company that acquired Tsukuda Original's successor PalBox.
        </p>
      </div>
    </div>
  );
};

export default Explore;
