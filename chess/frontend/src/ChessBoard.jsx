import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
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
  min-width: 120px;
  min-height: 400px;
  justify-content: flex-start;
  position: relative;
`;

const PlayerLabel = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlayerName = styled.span`
  color: ${props => props.isCurrentPlayer ? '#4CAF50' : 'inherit'};
  font-weight: ${props => props.isCurrentPlayer ? 'bold' : 'normal'};
  text-shadow: ${props => props.isCurrentPlayer ? '0 0 5px rgba(76, 175, 80, 0.5)' : 'none'};
`;

const CurrentPlayerIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4CAF50;
  box-shadow: 0 0 10px #4CAF50;
  animation: pulse 1.5s infinite;
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const CapturedPieces = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  font-size: 1.5rem;
  width: 100%;
  padding: 0 8px;
`;

const CapturedPiece = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color === 'w' ? '#ffffff' : '#000000'};
  text-shadow: ${props => props.color === 'w' ? '0 0 2px #000' : '0 0 2px #fff'};
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

const fireworksAnimation = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-40px) scale(0);
    opacity: 0;
  }
`;

const WinnerBanner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  color: gold;
  padding: 2rem 4rem;
  border-radius: 10px;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  animation: ${fireworksAnimation} 0.5s ease-out;
`;

const Firework = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${props => props.color};
  animation: ${fireworksAnimation} 1s ease-out infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
`;

const FireworksContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
`;

const ChessPiece = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${props => props.color === 'w' ? '#ffffff' : '#000000'};
  text-shadow: ${props => props.color === 'w' ? '0 0 2px #000' : '0 0 2px #fff'};
`;

const pieceUnicode = {
  w: {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚'
  },
  b: {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚'
  }
};

function fenToBoard(fen) {
  try {
    const chess = new Chess(fen);
    const board = chess.board();
    return board.map(row =>
      row.map(piece => {
        if (!piece) return null;
        return {
          type: piece.type,
          color: piece.color
        };
      })
    );
  } catch (error) {
    console.error('Error in fenToBoard:', error);
    return Array(8).fill(Array(8).fill(null));
  }
}

function getCapturedPieces(fen) {
  const chess = new Chess(fen);
  const board = chess.board();
  const captured = {
    white: { p: 0, r: 0, n: 0, b: 0, q: 0 },
    black: { p: 0, r: 0, n: 0, b: 0, q: 0 }
  };
  
  // Count pieces on the board
  board.forEach(row => {
    row.forEach(piece => {
      if (piece) {
        if (piece.color === 'w') {
          captured.white[piece.type]++;
        } else {
          captured.black[piece.type]++;
        }
      }
    });
  });

  // Calculate captured pieces (starting count - current count)
  return {
    white: {
      p: 8 - captured.white.p,
      r: 2 - captured.white.r,
      n: 2 - captured.white.n,
      b: 2 - captured.white.b,
      q: 1 - captured.white.q
    },
    black: {
      p: 8 - captured.black.p,
      r: 2 - captured.black.r,
      n: 2 - captured.black.n,
      b: 2 - captured.black.b,
      q: 1 - captured.black.q
    }
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

const createFireworks = () => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  const fireworks = [];
  for (let i = 0; i < 50; i++) {
    fireworks.push({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2
    });
  }
  return fireworks;
};

const ThinkingAnimation = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 8px;
`;

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const ChessBoard = ({ fen }) => {
  const [showWinner, setShowWinner] = useState(false);
  const [winner, setWinner] = useState(null);
  const [fireworks, setFireworks] = useState([]);
  
  const board = fen ? fenToBoard(fen) : initialBoard;
  const captured = fen ? getCapturedPieces(fen) : { white: { p: 0, r: 0, n: 0, b: 0, q: 0 }, black: { p: 0, r: 0, n: 0, b: 0, q: 0 } };

  // Get current player's turn from FEN
  const currentPlayer = fen ? (new Chess(fen)).turn() : 'w';

  // AI player names
  const playerNames = {
    w: "Deep Blue",
    b: "Stockfish"
  };

  useEffect(() => {
    if (fen) {
      const chess = new Chess(fen);
      if (chess.isGameOver()) {
        let winnerColor = null;
        if (chess.isCheckmate()) {
          winnerColor = chess.turn() === 'w' ? 'Black' : 'White';
        } else if (chess.isDraw()) {
          winnerColor = 'Draw';
        }
        if (winnerColor) {
          setWinner(winnerColor);
          setShowWinner(true);
          setFireworks(createFireworks());
          setTimeout(() => {
            setShowWinner(false);
            setFireworks([]);
          }, 5000);
        }
      }
    }
  }, [fen]);

  const renderCapturedPieces = (pieces, color) => {
    const result = [];
    // Order pieces by value (queen, rook, bishop, knight, pawn)
    const pieceOrder = ['q', 'r', 'b', 'n', 'p'];
    
    pieceOrder.forEach(type => {
      for (let i = 0; i < pieces[type]; i++) {
        result.push(
          <CapturedPiece key={`${type}-${i}`} color={color}>
            {pieceUnicode[color][type]}
          </CapturedPiece>
        );
      }
    });
    return result;
  };

  const renderPiece = (piece) => {
    try {
      if (!piece || !piece.type || !piece.color) return null;
      
      const unicode = pieceUnicode[piece.color]?.[piece.type];
      if (!unicode) {
        console.warn('Unknown piece:', piece);
        return null;
      }

      return (
        <ChessPiece color={piece.color}>
          {unicode}
        </ChessPiece>
      );
    } catch (error) {
      console.error('Error rendering piece:', error, piece);
      return null;
    }
  };

  return (
    <>
      {showWinner && (
        <>
          <FireworksContainer>
            {fireworks.map(firework => (
              <Firework
                key={firework.id}
                color={firework.color}
                left={firework.left}
                top={firework.top}
                delay={firework.delay}
              />
            ))}
          </FireworksContainer>
          <WinnerBanner>
            {winner === 'Draw' ? 'Game Ended in a Draw!' : `${playerNames[winner.toLowerCase()]} Wins!`}
          </WinnerBanner>
        </>
      )}
      <BoardContainer>
        <PlayerColumn>
          <PlayerLabel>
            <PlayerName isCurrentPlayer={currentPlayer === 'b'}>
              {playerNames.b}
            </PlayerName>
            {currentPlayer === 'b' && (
              <>
                <CurrentPlayerIndicator />
                <ThinkingAnimation />
              </>
            )}
          </PlayerLabel>
          <CapturedPieces>
            {renderCapturedPieces(captured.black, 'b')}
          </CapturedPieces>
        </PlayerColumn>
        <Grid>
          {board.map((row, rowIdx) =>
            row.map((piece, colIdx) => {
              const isDark = (rowIdx + colIdx) % 2 === 1;
              return (
                <Square key={`${rowIdx}-${colIdx}`} isDark={isDark}>
                  {renderPiece(piece)}
                </Square>
              );
            })
          )}
        </Grid>
        <PlayerColumn>
          <PlayerLabel>
            <PlayerName isCurrentPlayer={currentPlayer === 'w'}>
              {playerNames.w}
            </PlayerName>
            {currentPlayer === 'w' && (
              <>
                <CurrentPlayerIndicator />
                <ThinkingAnimation />
              </>
            )}
          </PlayerLabel>
          <CapturedPieces>
            {renderCapturedPieces(captured.white, 'w')}
          </CapturedPieces>
        </PlayerColumn>
      </BoardContainer>
    </>
  );
};

export default ChessBoard; 