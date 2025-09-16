import { Piece, Position } from "../types/game";

export const createInitialBoard = (): (Piece | null)[][] =>{
    const board: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));

    // Place black pieces (top 3 rows)
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row+col) % 2 === 1) {
                board[row][col] = { player: 'black', type: 'regular' };
            }
        }
    }

    // Place red pieces (bottom 3 rows)
    for (let row = 5; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row+col) % 2 === 1) {
                board[row][col] = { player: 'red', type: 'regular' };
            }
        }
    }
    
    return board;
}

export const isValidPosition = (pos: Position): boolean => {
    return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
};

export const isDarkSquare = (row: number, col: number): boolean => {
    return (row + col) % 2 === 1;
}