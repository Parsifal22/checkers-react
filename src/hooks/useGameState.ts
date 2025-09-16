import { useState, useCallback } from 'react';
import { GameState, Position } from '../types/game';
import { createInitialBoard } from '../utils/boardUtils';
import { getValidMoves, getValidCaptures, makeMove, checkWinner } from '../utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createInitialBoard(),
    currentPlayer: 'red',
    selectedPosition: null,
    gameOver: false,
    winner: null
  });

  const handleSquareClick = useCallback((row: number, col: number) => {
    if (gameState.gameOver) return;

    setGameState(prevState => {
      const newState = { ...prevState };
      const clickedPiece = newState.board[row][col];
      
      // If no piece is selected
      if (!newState.selectedPosition) {
        if (clickedPiece && clickedPiece.player === newState.currentPlayer) {
          newState.selectedPosition = { row, col };
        }
        return newState;
      }
      
      // If clicking the same piece, deselect it
      if (newState.selectedPosition.row === row && newState.selectedPosition.col === col) {
        newState.selectedPosition = null;
        return newState;
      }
      
      // If clicking another piece of the same player, select it
      if (clickedPiece && clickedPiece.player === newState.currentPlayer) {
        newState.selectedPosition = { row, col };
        return newState;
      }
      
      // Try to make a move
      const from = newState.selectedPosition;
      const to = { row, col };
      
      const validMoves = getValidMoves(newState.board, from);
      const validCaptures = getValidCaptures(newState.board, from);
      
      const isValidMove = validMoves.some(move => move.row === to.row && move.col === to.col);
      const isValidCapture = validCaptures.some(capture => capture.row === to.row && capture.col === to.col);
      
      if (isValidMove || isValidCapture) {
        const moveResult = makeMove(newState.board, from, to);
        newState.board = moveResult.newBoard;
        newState.currentPlayer = newState.currentPlayer === 'red' ? 'black' : 'red';
        newState.selectedPosition = null;
        
        const winner = checkWinner(newState.board, newState.currentPlayer);
        if (winner) {
          newState.gameOver = true;
          newState.winner = winner;
        }
      } else {
        newState.selectedPosition = null;
      }
      
      return newState;
    });
  }, [gameState.gameOver]);

  const resetGame = useCallback(() => {
    setGameState({
      board: createInitialBoard(),
      currentPlayer: 'red',
      selectedPosition: null,
      gameOver: false,
      winner: null
    });
  }, []);

  const getValidMovesForSelected = useCallback((): Position[] => {
    if (!gameState.selectedPosition) return [];
    return [
        ...getValidMoves(gameState.board, gameState.selectedPosition),
        ...getValidCaptures(gameState.board, gameState.selectedPosition)
    ];
  }, [gameState.selectedPosition, gameState.board]);

    return {
        gameState,
        handleSquareClick,
        resetGame,
        getValidMovesForSelected
    };
};