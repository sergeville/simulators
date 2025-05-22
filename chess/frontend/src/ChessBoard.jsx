import React from 'react';
import styled from 'styled-components';
import { Chess } from 'chess.js';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const PlayerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  min-height: 400px;
  justify-content: flex-start;
`;

const PlayerLabel = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1.1rem;
`;

const Pawns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 50px);
  grid-template-rows: repeat(8, 50px);
  gap: 0;
  border: 2px solid #333;
  background: #333;
`;

const Square = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: ${({ isDark }) => (isDark ? '#769656' : '#eeeed2')};
`;

const pieceUnicode = {
  w: {
    p: '♙', r: '♖', n: '♘', b: '♗', q: '♕', k: '♔'
  },
  b: {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚'
  }
};

function fenToBoard(fen) {
  const chess = new Chess(fen);
  const board = chess.board();
  return board.map(row =>
    row.map(piece =>
      piece ? pieceUnicode[piece.color][piece.type] : ''
    )
  );
}

function getCapturedPawns(fen) {
  const chess = new Chess(fen);
  const board = chess.board();
  let whitePawns = 0;
  let blackPawns = 0;
  board.forEach(row => {
    row.forEach(piece => {
      if (piece && piece.type === 'p') {
        if (piece.color === 'w') whitePawns++;
        if (piece.color === 'b') blackPawns++;
      }
    });
  });
  // Each side starts with 8 pawns
  return {
    white: 8 - whitePawns,
    black: 8 - blackPawns
  };
}

const initialBoard = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'],
  ['♟','♟','♟','♟','♟','♟','♟','♟'],
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  ['♙','♙','♙','♙','♙','♙','♙','♙'],
  ['♖','♘','♗','♕','♔','♗','♘','♖'],
];

const ChessBoard = ({ fen }) => {
  const board = fen ? fenToBoard(fen) : initialBoard;
  const captured = fen ? getCapturedPawns(fen) : { white: 0, black: 0 };
  return (
    <BoardContainer>
      <PlayerColumn>
        <PlayerLabel>White</PlayerLabel>
        <Pawns>
          {Array.from({ length: captured.black }).map((_, i) => (
            <span key={i}>{pieceUnicode.b.p}</span>
          ))}
        </Pawns>
      </PlayerColumn>
      <Grid>
        {board.map((row, rowIdx) =>
          row.map((piece, colIdx) => {
            const isDark = (rowIdx + colIdx) % 2 === 1;
            return (
              <Square key={`${rowIdx}-${colIdx}`} isDark={isDark}>
                {piece}
              </Square>
            );
          })
        )}
      </Grid>
      <PlayerColumn>
        <PlayerLabel>Black</PlayerLabel>
        <Pawns>
          {Array.from({ length: captured.white }).map((_, i) => (
            <span key={i}>{pieceUnicode.w.p}</span>
          ))}
        </Pawns>
      </PlayerColumn>
    </BoardContainer>
  );
};

export default ChessBoard; 