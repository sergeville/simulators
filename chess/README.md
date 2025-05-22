# Chess Simulator

A modern chess application featuring AI players with a beautiful UI and real-time game updates.

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
- Real-time updates with WebSocket
- Responsive and modern UI design

### AI Players
- Deep Blue (White)
- Stockfish (Black)
- Real-time move calculation
- Professional-level play

## Getting Started

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Game Rules

The game follows standard chess rules:
- Each player starts with 16 pieces
- White moves first
- Pieces move according to standard chess rules
- Game ends with checkmate or draw

## Development

### Project Structure
```
chess/
├── frontend/
│   ├── src/
│   │   ├── ChessBoard.jsx    # Main game board component
│   │   ├── App.jsx          # Application entry point
│   │   └── ...
│   ├── package.json
│   └── ...
└── backend/
    └── ...
```

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