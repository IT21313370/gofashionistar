import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Updated data for asset values instead of sales
const data = {
  labels: ['Jeans', 'Shoes', 'T-shirt', 'Dress', 'Sweater'],
  datasets: [
    {
      label: 'Asset Values ($)',
      data: [5000, 7000, 3000, 4000, 6000], // Example prices for the products
      backgroundColor: '#6366f1',
      borderColor: '#6366f1',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Allow dynamic height adjustment
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
};

const AssetChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64 md:h-72 lg:h-[500px] xl:h-[470px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AssetChart;
