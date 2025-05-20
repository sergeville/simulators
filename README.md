# Tic Tac Toe Simulator

This project is a real-time Tic Tac Toe simulator with AI, featuring a modern React frontend (Vite, default port 5173) and a Node.js backend with Socket.IO (port 8000). It is inspired by and references:

- [TIC-TAC-TOE-AI-TUTORIAL.md](./TIC-TAC-TOE-AI-TUTORIAL.md)
- [simulator.md](./simulator.md)

## Features
- Play against Rule-Based or Random AI
- Real-time updates with Socket.IO
- Modern, responsive, and accessible UI
- Trace logs for backend and frontend debugging

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/sergeville/tictactoe-simulator.git
   cd tictactoe-simulator
   ```
2. Install backend dependencies:
   ```bash
   cd tictactoe/backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App
1. Start the backend (port 8000):
   ```bash
   cd tictactoe/backend
   node server.js
   ```
2. In a new terminal, start the frontend (Vite, default port 5173):
   ```bash
   cd tictactoe/frontend
   npm run dev
   ```
3. Open your browser to [http://localhost:5173](http://localhost:5173)

- The backend will be available at [http://localhost:8000](http://localhost:8000)
- The frontend will be available at [http://localhost:5173](http://localhost:5173)

## References
- See [TIC-TAC-TOE-AI-TUTORIAL.md](./TIC-TAC-TOE-AI-TUTORIAL.md) for AI strategies and learning concepts.
- See [simulator.md](./simulator.md) for real-time simulator architecture and best practices.

## License
MIT 