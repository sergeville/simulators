# Real-Time Games Project Structure

This repository is organized for scalable, modular development of real-time games. Each game (e.g., Tic Tac Toe, Chess) is self-contained in its own folder, with separate frontend and backend implementations. This structure makes it easy to add new games, maintain code, and keep dependencies isolated.

## Project Structure

```
.
├── tictactoe/
│   ├── backend/   # Node.js backend (Express + Socket.IO)
│   └── frontend/  # React (Vite) frontend
├── chess/
│   ├── backend/   # Node.js backend (Express + Socket.IO)
│   └── frontend/  # React (Vite) frontend
├── LICENSE
├── README.md
├── TIC-TAC-TOE-AI-TUTORIAL.md
├── simulator.md
└── ...
```

## How It Works
- **Each game** lives in its own top-level folder (e.g., `tictactoe/`, `chess/`).
- **Each game folder** contains:
  - `backend/`: Node.js server (Express + Socket.IO)
  - `frontend/`: React (Vite) client
- **Documentation and setup** for each game is in its own `README.md` inside the game folder.

## Adding a New Game
1. Create a new folder at the project root (e.g., `mynewgame/`).
2. Add `backend/` and `frontend/` subfolders with your implementations.
3. Add a `README.md` in your game folder with setup and usage instructions.
4. Follow the structure of the existing games for best practices.

## Getting Started
- See `tictactoe/README.md` or `chess/README.md` for instructions on running each game.
- Each game is independent; you can run one or both at the same time.

## Documentation
- [TIC-TAC-TOE-AI-TUTORIAL.md](./TIC-TAC-TOE-AI-TUTORIAL.md): AI strategies and tournament systems for Tic Tac Toe.
- [simulator.md](./simulator.md): Implementation guide for real-time simulators.
- [Create-a-release.md](./Create-a-release.md): GitHub release instructions.

## License

This project is licensed under the [MIT License](./LICENSE).

Copyright (c) 2024 Serge Villeneuve 

const BACKEND_URL = 'http://localhost:8000'; 