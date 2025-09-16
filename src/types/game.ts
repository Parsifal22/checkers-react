export type Player = 'red' | 'black';
export type PieceType = 'regular' | 'king';

export interface Piece {
    player: Player;
    type: PieceType;
}

export interface Position {
    row: number;
    col: number;
}

export interface GameState {
    board: (Piece | null)[][];
    currentPlayer: Player;
    selectedPosition: Position | null;
    gameOver: boolean;
    winner: Player | null;
}

export interface MoveResult {
    newBoard: (Piece | null)[][];
    captured: boolean;
}