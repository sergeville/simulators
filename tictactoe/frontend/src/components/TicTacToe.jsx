import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

const BACKEND_PORT = 8000;
const socket = io(`http://localhost:${BACKEND_PORT}`);

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 300px;
  margin: 20px auto;
`;

const Cell = styled.button`
  width: 90px;
  height: 90px;
  font-size: 40px;
  background: #fff;
  border: 2px solid #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f0f0f0;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const GameContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const Status = styled.div`
  font-size: 24px;
  margin: 20px 0;
  color: #333;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  margin: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #45a049;
  }
`;

const TicTacToe = () => {
  const [game, setGame] = useState(null);
  const [selectedAI, setSelectedAI] = useState('rule-based');

  useEffect(() => {
    console.log('[TRACE] Connecting to backend...');
    socket.on('connect', () => {
      console.log('[TRACE] Connected to backend');
    });
    socket.on('gameState', (gameState) => {
      console.log('[TRACE] Received gameState:', gameState);
      setGame(gameState);
    });
    return () => {
      socket.off('gameState');
      socket.off('connect');
    };
  }, []);

  const handleCellClick = (row, col) => {
    console.log(`[TRACE] handleCellClick: row=${row}, col=${col}`);
    if (game && game.status === 'playing' && game.currentPlayer === 'X') {
      socket.emit('makeMove', { row, col });
    }
  };

  const startNewGame = () => {
    console.log(`[TRACE] startNewGame with AI: ${selectedAI}`);
    socket.emit('startGame', { aiType: selectedAI });
  };

  const getStatusMessage = () => {
    if (!game) return 'Select AI type and start a new game';
    if (game.status === 'won') return `Winner: ${game.winner}`;
    if (game.status === 'draw') return 'Game ended in a draw';
    return `Current player: ${game.currentPlayer}`;
  };

  return (
    <GameContainer>
      <div style={{ fontSize: '14px', color: '#888', marginBottom: '10px' }}>
        Communicating with backend on port <b>{BACKEND_PORT}</b>
      </div>
      <h1>Tic Tac Toe Game</h1>
      <div>
        <Select
          value={selectedAI}
          onChange={(e) => setSelectedAI(e.target.value)}
          disabled={game && game.status === 'playing'}
        >
          <option value="rule-based">Rule-Based AI</option>
          <option value="random">Random AI</option>
        </Select>
        <Button onClick={startNewGame} disabled={game && game.status === 'playing'}>
          New Game
        </Button>
      </div>
      <Status>{getStatusMessage()}</Status>
      {game && (
        <Board>
          {game.board.map((row, i) =>
            row.map((cell, j) => (
              <Cell
                key={`${i}-${j}`}
                onClick={() => handleCellClick(i, j)}
                disabled={cell !== null || game.status !== 'playing'}
              >
                {cell}
              </Cell>
            ))
          )}
        </Board>
      )}
    </GameContainer>
  );
};

export default TicTacToe;