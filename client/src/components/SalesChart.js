import React, { useEffect, useState } from 'react';
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

const AssetChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Product Count',
        data: [],
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Fetch product data from backend API
    fetch('http://localhost:5000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Process data to count products by name
        const productCounts = data.reduce((acc, product) => {
          acc[product.name] = (acc[product.name] || 0) + 1;
          return acc;
        }, {});

        // Prepare chart data
        const labels = Object.keys(productCounts);
        const counts = Object.values(productCounts);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Product Count',
              data: counts,
              backgroundColor: '#6366f1',
              borderColor: '#6366f1',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

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

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64 md:h-72 lg:h-[500px] xl:h-[470px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AssetChart;
