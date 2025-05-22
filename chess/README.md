# Chess Simulator

A real-time Chess simulator with AI, featuring a modern React frontend (Vite) and a Node.js backend with Socket.IO.

## Project Structure

```
chess/
├── backend/   # Node.js backend (Express + Socket.IO)
└── frontend/  # React (Vite) frontend
```

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
1. Install backend dependencies:
   ```bash
   cd chess/backend
   npm install
   ```
2. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App
1. Start the backend (default port 8000):
   ```bash
   cd chess/backend
   npm start
   ```
2. In a new terminal, start the frontend (default port 5173):
   ```bash
   cd chess/frontend
   npm run dev
   ```
3. Open your browser to [http://localhost:5173](http://localhost:5173)

- Backend: [http://localhost:8000](http://localhost:8000)
- Frontend: [http://localhost:5173](http://localhost:5173)

## Documentation
- [chess-simulator.md](./chess-simulator.md): Detailed design and conception discussion
- [../simulator.md](../simulator.md): General simulator architecture and best practices

## License

This project is licensed under the [MIT License](../LICENSE).

Copyright (c) 2024 Serge Villeneuve 