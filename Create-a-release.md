# How to Create a GitHub Release

This document explains how to create a release for your project on GitHub, both manually and using the GitHub API for automation.

---

## Manual Release via GitHub Web UI

1. Go to your repository on GitHub (e.g., https://github.com/sergeville/tictactoe-simulator)
2. Click the **Releases** tab (or go to https://github.com/sergeville/tictactoe-simulator/releases)
3. Click **Draft a new release**
4. For the tag, select or enter your version (e.g., `v1.0.0`)
5. For the release title, enter something like:
   `Tic Tac Toe Simulator v1.0.0`
6. For the description, you can use:

---

## v1.0.0 – Tic Tac Toe Simulator

### Summary

This project is a real-time Tic Tac Toe simulator featuring a modern React (Vite) frontend and a Node.js backend with Socket.IO. It allows you to play against AI (Rule-Based or Random), with a clean, responsive UI and real-time updates. The project is inspired by and references advanced AI and simulation architecture documents.

### Features

- **Single-player Tic Tac Toe:** Play against Rule-Based or Random AI.
- **Real-time updates:** Uses Socket.IO for instant game state updates.
- **Modern UI:** Responsive, accessible, and visually appealing interface.
- **Trace logs:** Both backend and frontend include detailed trace logs for debugging and learning.
- **Easy setup:** Simple instructions for running both backend and frontend locally.
- **Documentation:** References to [TIC-TAC-TOE-AI-TUTORIAL.md](./TIC-TAC-TOE-AI-TUTORIAL.md) and [simulator.md](./simulator.md) for deeper learning.

### How to Run

1. **Backend:**  
   ```bash
   cd tictactoe/backend
   npm install
   node server.js
   ```
   (Runs on port 8000)

2. **Frontend:**  
   ```bash
   cd tictactoe/frontend
   npm install
   npm run dev
   ```
   (Runs on port 5173)

3. **Open your browser:**  
   [http://localhost:5173](http://localhost:5173)

### References

- [TIC-TAC-TOE-AI-TUTORIAL.md](./TIC-TAC-TOE-AI-TUTORIAL.md): AI strategies and learning concepts.
- [simulator.md](./simulator.md): Real-time simulator architecture and best practices.

---

7. Click **Publish release**

---

## Automated Release via GitHub API

### 1. Get a GitHub Personal Access Token
- Go to https://github.com/settings/tokens
- Click "Generate new token" (classic)
- Give it a name, and select the `repo` scope
- Copy the token (you'll need it below)

### 2. Use the GitHub API to create a release

Replace `YOUR_GITHUB_TOKEN` and the repo URL as needed:

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/sergeville/tictactoe-simulator/releases \
  -d '{
    "tag_name": "v1.0.0",
    "target_commitish": "main",
    "name": "Tic Tac Toe Simulator v1.0.0",
    "body": "## v1.0.0 – Tic Tac Toe Simulator\n\n### Summary\n\nThis project is a real-time Tic Tac Toe simulator featuring a modern React (Vite) frontend and a Node.js backend with Socket.IO. It allows you to play against AI (Rule-Based or Random), with a clean, responsive UI and real-time updates. The project is inspired by and references advanced AI and simulation architecture documents.\n\n### Features\n\n- **Single-player Tic Tac Toe:** Play against Rule-Based or Random AI.\n- **Real-time updates:** Uses Socket.IO for instant game state updates.\n- **Modern UI:** Responsive, accessible, and visually appealing interface.\n- **Trace logs:** Both backend and frontend include detailed trace logs for debugging and learning.\n- **Easy setup:** Simple instructions for running both backend and frontend locally.\n- **Documentation:** References to [TIC-TAC-TOE-AI-TUTORIAL.md](./TIC-TAC-TOE-AI-TUTORIAL.md) and [simulator.md](./simulator.md) for deeper learning.\n\n### How to Run\n\n1. **Backend:**  \n   ```bash\n   cd tictactoe/backend\n   npm install\n   node server.js\n   ```\n   (Runs on port 8000)\n\n2. **Frontend:**  \n   ```bash\n   cd tictactoe/frontend\n   npm install\n   npm run dev\n   ```\n   (Runs on port 5173)\n\n3. **Open your browser:**  \n   [http://localhost:5173](http://localhost:5173)\n\n### References\n\n- [TIC-TAC-TOE-AI-TUTORIAL.md](./TIC-TAC-TOE-AI-TUTORIAL.md): AI strategies and learning concepts.\n- [simulator.md](./simulator.md): Real-time simulator architecture and best practices.\n",
    "draft": false,
    "prerelease": false
  }'
```

---

### Want a Node.js script or GitHub CLI version?
Let us know if you want a Node.js script, a GitHub CLI (`gh release create ...`) command, or a more advanced automation (like in a CI workflow)! 