import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChessBoard from './ChessBoard';
import socket from './socket';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  margin-bottom: 32px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 8px 24px;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  background: #333;
  color: #fff;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const App = () => {
  const [aiType, setAiType] = useState('classic');
  const [simulating, setSimulating] = useState(false);
  const [fen, setFen] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to backend via socket.io');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from backend');
    });
    socket.on('welcome', (msg) => {
      console.log('Backend says:', msg);
    });
    socket.on('simulation_update', ({ fen }) => {
      setFen(fen);
    });
    socket.on('simulation_stopped', () => {
      setSimulating(false);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('welcome');
      socket.off('simulation_update');
      socket.off('simulation_stopped');
    };
  }, []);

  const handleStart = () => {
    setSimulating(true);
    socket.emit('start_simulation', { aiType });
  };

  const handleStop = () => {
    setSimulating(false);
    socket.emit('stop_simulation');
  };

  return (
    <AppContainer>
      <Title>Chess Simulator</Title>
      <RadioGroup>
        <label>
          <input
            type="radio"
            name="aiType"
            value="classic"
            checked={aiType === 'classic'}
            onChange={() => setAiType('classic')}
          />
          Classic AI
        </label>
        <label>
          <input
            type="radio"
            name="aiType"
            value="agent"
            checked={aiType === 'agent'}
            onChange={() => setAiType('agent')}
            disabled
          />
          Agent (coming soon)
        </label>
        <label>
          <input
            type="radio"
            name="aiType"
            value="transformer"
            checked={aiType === 'transformer'}
            onChange={() => setAiType('transformer')}
            disabled
          />
          Transformer (coming soon)
        </label>
      </RadioGroup>
      <ButtonGroup>
        <Button onClick={handleStart} disabled={simulating}>Start</Button>
        <Button onClick={handleStop} disabled={!simulating}>Stop</Button>
      </ButtonGroup>
      <ChessBoard fen={fen} />
    </AppContainer>
  );
};

export default App; 