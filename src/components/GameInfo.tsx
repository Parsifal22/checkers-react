import React from 'react';
import { GameState } from '../types/game';

interface GameInfoProps {
  gameState: GameState;
  onResetGame: () => void;
}

export const GameInfo: React.FC<GameInfoProps> = ({ gameState, onResetGame }) => {
  return (
    <div className="text-center">
      <p className="text-xl mb-2">
        Current Player: <span className={`font-bold ${gameState.currentPlayer === 'red' ? 'text-red-600' : 'text-gray-800'}`}>
          {gameState.currentPlayer.toUpperCase()}
        </span>
      </p>
      {gameState.gameOver && (
        <p className="text-2xl font-bold text-green-600 mb-4">
          🎉 {gameState.winner?.toUpperCase()} WINS! 🎉
        </p>
      )}
      
      <button
        onClick={onResetGame}
        className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-bold mb-4"
      >
        New Game
      </button>
      
      <div className="max-w-md text-center text-sm text-amber-800">
        <p><strong>How to play:</strong> Click a piece to select it, then click where you want to move. 
        Jump over opponent pieces to capture them. Reach the opposite end to become a king!</p>
      </div>
    </div>
  );
};