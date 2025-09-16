import React from 'react';
import { Square } from './Square';
import { GameState, Position } from '../types/game';
import { isDarkSquare } from '../utils/boardUtils';

interface GameBoardProps {
  gameState: GameState;
  validMoves: Position[];
  onSquareClick: (row: number, col: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  gameState, 
  validMoves, 
  onSquareClick 
}) => {
  return (
    <div className="grid grid-cols-8 gap-0 border-4 border-amber-900 mb-4">
      {gameState.board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isSelected = gameState.selectedPosition?.row === rowIndex && 
                           gameState.selectedPosition?.col === colIndex;
          const isValidMove = validMoves.some(move => 
            move.row === rowIndex && move.col === colIndex
          );
          
          return (
            <Square
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              isSelected={isSelected}
              isValidMove={isValidMove}
              onClick={() => onSquareClick(rowIndex, colIndex)}
              isDark={isDarkSquare(rowIndex, colIndex)}
            />
          );
        })
      )}
    </div>
  );
};