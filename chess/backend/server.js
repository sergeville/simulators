const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { Chess } = require('chess.js');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let simulationInterval = null;
let simulationChess = null;

function getRandomMove(fen) {
  const chess = new Chess(fen);
  const moves = chess.moves();
  if (moves.length === 0) return null;
  const move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
  return { move, fen: chess.fen() };
}

function startSimulation(socket, aiType) {
  if (simulationInterval) return; // Already running
  simulationChess = new Chess();
  console.log('Simulation started (AI type:', aiType + ')');
  function makeMove() {
    console.log('makeMove called');
    if (simulationChess.isGameOver()) {
      console.log('Simulation ended. Final FEN:', simulationChess.fen());
      socket.emit('simulation_update', { fen: simulationChess.fen() });
      socket.emit('simulation_stopped');
      clearInterval(simulationInterval);
      simulationInterval = null;
      return;
    }
    const moves = simulationChess.moves();
    if (moves.length === 0) {
      console.log('No more moves. Final FEN:', simulationChess.fen());
      socket.emit('simulation_update', { fen: simulationChess.fen() });
      socket.emit('simulation_stopped');
      clearInterval(simulationInterval);
      simulationInterval = null;
      return;
    }
    const move = moves[Math.floor(Math.random() * moves.length)];
    simulationChess.move(move);
    console.log('Move:', move, '| FEN:', simulationChess.fen());
    socket.emit('simulation_update', { fen: simulationChess.fen() });
  }
  socket.emit('simulation_update', { fen: simulationChess.fen() });
  simulationInterval = setInterval(makeMove, 700);
}

function stopSimulation(socket) {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
    console.log('Simulation stopped by user.');
    socket.emit('simulation_stopped');
  }
}

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.emit('welcome', 'Welcome to the Chess backend!');

  socket.on('request_ai_move', ({ fen, aiType }, callback) => {
    if (aiType === 'classic') {
      const result = getRandomMove(fen);
      callback({ success: true, ...result });
    } else if (aiType === 'agent' || aiType === 'transformer') {
      callback({ success: false, error: 'This AI type is not yet implemented.' });
    } else {
      callback({ success: false, error: 'Unknown AI type.' });
    }
  });

  socket.on('start_simulation', ({ aiType }) => {
    startSimulation(socket, aiType);
  });

  socket.on('stop_simulation', () => {
    stopSimulation(socket);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Chess backend server running on port ${PORT}`);
}); 