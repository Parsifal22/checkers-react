import React from 'react';
import { GameBoard } from './components/GameBoard';
import { GameInfo } from './components/GameInfo';
import { useGameState } from './hooks/useGameState';

const App: React.FC = () => {
  const { gameState, handleSquareClick, resetGame, getValidMovesForSelected } = useGameState();
  const validMoves = getValidMovesForSelected();

  return (
    <div className="flex flex-col items-center p-8 bg-amber-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-amber-900">TypeScript React Checkers</h1>
      
      <GameInfo gameState={gameState} onResetGame={resetGame} />
      <GameBoard 
        gameState={gameState} 
        validMoves={validMoves} 
        onSquareClick={handleSquareClick} 
      />
    </div>
  );
};

export default App;