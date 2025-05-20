# Real-Time Simulation Dashboard

This project implements a real-time simulation dashboard with a Node.js backend and React frontend. The application displays real-time data visualization using Chart.js.

## Features

- Real-time data simulation
- Multiple data streams (value, temperature, pressure)
- Interactive charts
- WebSocket communication
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server (from the root directory):
```bash
node server.js
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Architecture

- Backend: Node.js with Express and Socket.IO
- Frontend: React with Chart.js
- Real-time communication: WebSocket (Socket.IO)

## Data Visualization

The dashboard displays three real-time data streams:
- Value (sine wave)
- Temperature (random values)
- Pressure (random values)

Each data point is updated every 100ms, and the chart maintains a rolling window of the last 50 data points. 