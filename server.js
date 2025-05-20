const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Serve static files from the frontend build directory
app.use(express.static('frontend/build'));

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Simulation data generation
function generateSimulationData() {
  return {
    timestamp: Date.now(),
    value: Math.sin(Date.now() / 1000) * 100,
    // Add more simulation data as needed
    temperature: 20 + Math.random() * 10,
    pressure: 1000 + Math.random() * 50
  };
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send initial data
  socket.emit('simulationData', generateSimulationData());
  
  // Set up interval for real-time data
  const interval = setInterval(() => {
    socket.emit('simulationData', generateSimulationData());
  }, 100);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 