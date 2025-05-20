import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const socket = io('http://localhost:3001');

const SimulationChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Value',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Temperature',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Pressure',
        data: [],
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      }
    ]
  });

  useEffect(() => {
    socket.on('simulationData', (newData) => {
      setData(prevData => ({
        labels: [...prevData.labels, new Date(newData.timestamp).toLocaleTimeString()].slice(-50),
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newData.value].slice(-50)
          },
          {
            ...prevData.datasets[1],
            data: [...prevData.datasets[1].data, newData.temperature].slice(-50)
          },
          {
            ...prevData.datasets[2],
            data: [...prevData.datasets[2].data, newData.pressure].slice(-50)
          }
        ]
      }));
    });

    return () => {
      socket.off('simulationData');
    };
  }, []);

  const options = {
    responsive: true,
    animation: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Real-time Simulation Data'
      }
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SimulationChart; 