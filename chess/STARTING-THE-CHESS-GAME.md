# Starting the Chess Simulator

Follow these steps to get the Chess Simulator up and running on your local machine.

## Prerequisites
- Node.js (v16+ recommended)
- npm

## Step 1: Clone the Repository
If you haven't already, clone the repository:
```bash
git clone https://github.com/sergeville/chess-simulator.git
cd chess-simulator
```

## Step 2: Install Backend Dependencies
Navigate to the backend folder and install dependencies:
```bash
cd chess/backend
npm install
```

## Step 3: Start the Backend Server
Run the backend server (it will listen on port 8000):
```bash
npm start
```
You should see a message: "Chess backend server running on port 8000"

## Step 4: Install Frontend Dependencies
Open a new terminal window, navigate to the frontend folder, and install dependencies:
```bash
cd chess/frontend
npm install
```
If you encounter dependency conflicts, you can resolve them by using:
```bash
npm install --legacy-peer-deps
```

## Step 5: Start the Frontend Development Server
Run the frontend development server (it will be available on port 5173):
```bash
npm run dev
```
You should see a message indicating the server is running, typically with a URL like [http://localhost:5173](http://localhost:5173).

## Step 6: Access the Chess Simulator
Open your web browser and navigate to [http://localhost:5173](http://localhost:5173). You should see the Chess Simulator interface.

## Troubleshooting
- If the backend or frontend fails to start, check the terminal for error messages.
- Ensure that ports 8000 and 5173 are not in use by other applications.
- If you encounter CORS issues, verify that the backend's CORS settings allow connections from the frontend.

## Next Steps
- Explore the game features and play against the AI.
- Refer to the [chess-simulator.md](./chess-simulator.md) for detailed design and architecture information.
- Check the [README.md](./README.md) for additional documentation and references.

---

*This guide was created as part of the Chess Simulator project.* 