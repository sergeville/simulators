const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
};
app.use(cors(corsOptions));

// Add trace log middleware for all requests
app.use((req, res, next) => {
  console.log(`[TRACE] ${req.method} ${req.url} from ${req.ip}`);
  next();
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: corsOptions
});

// Game state
const games = new Map();

// AI Types
const AI_TYPES = {
  RULE_BASED: 'rule-based',
  DEFENSIVE: 'defensive',
  AGGRESSIVE: 'aggressive',
  BALANCED: 'balanced',
  RANDOM: 'random'
};

// Rule-based AI implementation
function ruleBasedAI(board, player) {
  const opponent = player === 'X' ? 'O' : 'X';
  
  // Check for winning move
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        board[i][j] = player;
        if (checkWinner(board) === player) {
          board[i][j] = null;
          return [i, j];
        }
        board[i][j] = null;
      }
    }
  }
  
  // Block opponent's winning move
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        board[i][j] = opponent;
        if (checkWinner(board) === opponent) {
          board[i][j] = null;
          return [i, j];
        }
        board[i][j] = null;
      }
    }
  }
  
  // Take center if available
  if (!board[1][1]) return [1, 1];
  
  // Take corners
  const corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
  for (const [i, j] of corners) {
    if (!board[i][j]) return [i, j];
  }
  
  // Take any available move
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) return [i, j];
    }
  }
  
  return null;
}

// Random AI implementation
function randomAI(board) {
  const availableMoves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        availableMoves.push([i, j]);
      }
    }
  }
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Check for winner
function checkWinner(board) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
  }
  
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
      return board[0][j];
    }
  }
  
  // Check diagonals
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }
  
  return null;
}

// Check for draw
function checkDraw(board) {
  return board.every(row => row.every(cell => cell !== null));
}

// Log outgoing /health responses
app.get('/health', (req, res) => {
  const response = { status: 'ok', message: 'TicTacToe backend is running!' };
  console.log(`[TRACE][RESPONSE] /health ->`, response);
  res.json(response);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`[TRACE] New client connected: ${socket.id}`);
  
  socket.on('startGame', ({ aiType }) => {
    console.log(`[TRACE][SOCKET] startGame from ${socket.id} with AI: ${aiType}`);
    const gameId = socket.id;
    const game = {
      board: Array(3).fill().map(() => Array(3).fill(null)),
      currentPlayer: 'X',
      aiType: aiType || AI_TYPES.RULE_BASED,
      status: 'playing'
    };
    games.set(gameId, game);
    socket.emit('gameState', game);
  });
  
  socket.on('makeMove', ({ row, col }) => {
    console.log(`[TRACE][SOCKET] makeMove from ${socket.id}: row=${row}, col=${col}`);
    const game = games.get(socket.id);
    if (!game || game.status !== 'playing') return;
    if (game.board[row][col] !== null) return;
    game.board[row][col] = game.currentPlayer;
    const winner = checkWinner(game.board);
    if (winner) {
      game.status = 'won';
      game.winner = winner;
      console.log(`[TRACE] Game won by ${winner} (client: ${socket.id})`);
      socket.emit('gameState', game);
      return;
    }
    if (checkDraw(game.board)) {
      game.status = 'draw';
      console.log(`[TRACE] Game draw (client: ${socket.id})`);
      socket.emit('gameState', game);
      return;
    }
    game.currentPlayer = 'O';
    let aiMove;
    switch (game.aiType) {
      case AI_TYPES.RULE_BASED:
        aiMove = ruleBasedAI(game.board, 'O');
        break;
      case AI_TYPES.RANDOM:
        aiMove = randomAI(game.board);
        break;
      default:
        aiMove = ruleBasedAI(game.board, 'O');
    }
    if (aiMove) {
      const [aiRow, aiCol] = aiMove;
      game.board[aiRow][aiCol] = 'O';
      const aiWinner = checkWinner(game.board);
      if (aiWinner) {
        game.status = 'won';
        game.winner = aiWinner;
        console.log(`[TRACE] Game won by AI (${aiWinner}) (client: ${socket.id})`);
      } else if (checkDraw(game.board)) {
        game.status = 'draw';
        console.log(`[TRACE] Game draw after AI move (client: ${socket.id})`);
      }
    }
    game.currentPlayer = 'X';
    socket.emit('gameState', game);
  });
  
  socket.on('disconnect', () => {
    console.log(`[TRACE][SOCKET] Client disconnected: ${socket.id}`);
    games.delete(socket.id);
  });
});

// Add error handling middleware for trace logging
app.use((err, req, res, next) => {
  console.error(`[TRACE][ERROR] ${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
  console.log(`[TRACE][RESPONSE][ERROR] ${req.method} ${req.url} -> 500 Internal Server Error`);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`[TRACE] Backend server running on port ${PORT}`);
}); 