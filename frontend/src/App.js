import React from 'react';
import SimulationChart from './components/SimulationChart';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Simulation Dashboard</h1>
      </header>
      <main>
        <SimulationChart />
      </main>
    </div>
  );
}

export default App;
