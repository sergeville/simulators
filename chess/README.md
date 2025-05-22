# Chess Simulator

A modern chess application featuring AI players with a beautiful UI and real-time game updates.

---

**Note:** This documentation was merged and cleaned up from previous versions for clarity and completeness.

---

## Features

### Game Interface
- Interactive chess board with proper piece movement
- Colored chess pieces (white and black) with proper contrast
- Current player indicator with pulsing green dot
- Thinking animation for the active player
- AI player names (Deep Blue and Stockfish)

### Captured Pieces Display
- Organized display of captured pieces in 3 columns
- Pieces ordered by value (queen, rook, bishop, knight, pawn)
- Color-coded pieces matching the board
- Clear visual separation between white and black captures

### Game Status
- Winner announcement banner with fireworks animation
- Game state tracking (checkmate, draw)
- Current player turn indication
- AI player names and status

### Visual Effects
- Animated fireworks for game completion
- Pulsing indicators for current player
- Smooth animations for piece movements
- Responsive design for different screen sizes

## Technical Details

### Frontend
- Built with React and styled-components
- Uses chess.js for game logic
- Real-time updates with Socket.IO
- Responsive and modern UI design

### Backend
- Node.js backend (Express + Socket.IO)
- Real-time game state and AI logic
- Trace logs for backend and frontend debugging

### AI Players
- Deep Blue (White)
- Stockfish (Black)
- Real-time move calculation
- Professional-level play

## Project Structure
```
chess/
├── backend/   # Node.js backend (Express + Socket.IO)
│   └── server.js
│   └── package.json
├── frontend/  # React (Vite) frontend
│   ├── src/
│   │   ├── ChessBoard.jsx    # Main game board component
│   │   ├── App.jsx          # Application entry point
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

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

## Game Rules

The game follows standard chess rules:
- Each player starts with 16 pieces
- White moves first
- Pieces move according to standard chess rules
- Game ends with checkmate or draw

## Development

### Key Components
- `ChessBoard.jsx`: Main game board with piece rendering and game logic
- `App.jsx`: Application setup and routing
- Styled components for UI elements

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 