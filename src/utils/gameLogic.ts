import { MoveResult, Piece, Player, Position } from "../types/game";
import { isValidPosition } from "./boardUtils";

export const getValidMoves = (board: (Piece | null)[][], from: Position): Position[] => {

    const piece = board[from.row][from.col];

    if (!piece) return [];

    const moves: Position[] = [];
    const directions = piece.type === 'king' 
    ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] 
    : piece.player === 'red' 
      ? [[-1, -1], [-1, 1]] 
      : [[1, -1], [1, 1]];

    for (const [rowDir, colDir] of directions) {
        const newPos = {row: from.row + rowDir, col: from.col + colDir};

        if (isValidPosition(newPos) && !board[newPos.row][newPos.col]) {
            moves.push(newPos);
        }
    }

    return moves;
};


export const getValidCaptures = (board: (Piece | null)[][], from: Position): Position[] => {
    const piece = board[from.row][from.col];
    if (!piece) return [];

    const captures: Position[] = [];
    const directions = piece.type === 'king' 
    ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] 
    : piece.player === 'red' 
      ? [[-1, -1], [-1, 1]] 
      : [[1, -1], [1, 1]];

    for (const [rowDir, colDir] of directions) {
        const jumpOver = { row: from.row + rowDir, col: from.col + colDir };
        const landOn = { row: from.row + rowDir * 2, col: from.col + colDir * 2 };
        
        if (isValidPosition(jumpOver) && isValidPosition(landOn)) {
            const jumpedPiece = board[jumpOver.row][jumpOver.col];
            const landingSquare = board[landOn.row][landOn.col];
            
            if (jumpedPiece && jumpedPiece.player !== piece.player && !landingSquare) {
                captures.push(landOn);
            }
        }
    }

  return captures;
};

export const makeMove = (board: (Piece | null)[][], from: Position, to: Position): MoveResult => {
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[from.row][from.col];

    if (!piece) {
        return {newBoard, captured: false};
    }

    let captured = false;

    // Move the piece
    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = null;

    // Handle king promotion
    if (piece.type === 'regular') {
        if ((piece.player === 'red' && to.row === 0) ||
            (piece.player === 'black' && to.row === 7)) {
                newBoard[to.row][to.col] = { ...piece, type: 'king' };
        }
    }

    return { newBoard, captured};
};

export const checkWinner = (board: (Piece | null)[][], currentPlayer: Player): Player | null => {
    let redPieces = 0;
    let blackPieces = 0;
    let redCanMove = false;
    let blackCanMove = false;
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece) {
                if (piece.player === 'red') {
                    redPieces++;
                    if (!redCanMove && (getValidMoves(board, {row, col}).length > 0 || 
                                        getValidCaptures(board, {row, col}).length > 0)) {
                        redCanMove = true;
                    }
                } else {
                    blackPieces++;
                    if (!blackCanMove && (getValidMoves(board, {row, col}).length > 0 || 
                                          getValidCaptures(board, {row, col}).length > 0)) {
                        blackCanMove = true;
                    }
                }
            }
        }
    }
    
    if (redPieces === 0 || !redCanMove) return 'black';
    if (blackPieces === 0 || !blackCanMove) return 'red';
    return null;
};