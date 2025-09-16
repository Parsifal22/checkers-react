import React from 'react';
import { Piece } from '../types/game';

interface SquareProps {
  piece: Piece | null;
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
  isDark: boolean;
}

export const Square: React.FC<SquareProps> = ({ 
  piece, 
  isSelected, 
  isValidMove, 
  onClick, 
  isDark 
}) => {
  return (
    <div
      className={`
        w-16 h-16 flex items-center justify-center cursor-pointer border-2 transition-all
        ${isDark ? 'bg-amber-800' : 'bg-amber-200'}
        ${isSelected ? 'border-yellow-400 border-4' : 'border-amber-900'}
        ${isValidMove ? 'bg-green-300 border-green-500' : ''}
        hover:brightness-110
      `}
      onClick={onClick}
    >
      {piece && (
        <div
          className={`
            w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold
            ${piece.player === 'red' ? 'bg-red-600 border-red-800' : 'bg-gray-800 border-black'}
            ${piece.type === 'king' ? 'text-yellow-300' : 'text-white'}
            shadow-lg
          `}
        >
          {piece.type === 'king' ? '♔' : ''}
        </div>
      )}
    </div>
  );
};