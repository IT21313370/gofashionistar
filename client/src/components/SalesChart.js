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

const customLegendPlugin = {
  id: 'customLegendPlugin',
  afterUpdate(chart) {
    const legend = chart.legend;
    legend.legendItems.forEach((item) => {
      item.fillStyle = 'rgba(0, 0, 0, 0)'; // Set the color to be transparent
    });
  },
};

const AssetChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Product Count',
        data: [],
        backgroundColor: [], // Multiple colors will be set here
        borderColor: '#6366f1',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const productCounts = data.reduce((acc, product) => {
          acc[product.name] = (acc[product.name] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(productCounts);
        const counts = Object.values(productCounts);

        const colors = [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ];
        const backgroundColors = counts.map((_, index) => colors[index % colors.length]);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Product Count',
              data: counts,
              backgroundColor: backgroundColors,
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
    maintainAspectRatio: false,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels(chart) {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels;
            const labelsOriginal = original.call(this, chart);

            labelsOriginal.forEach((label) => {
              label.fillStyle = 'rgba(0, 0, 0, 0)'; // Make the color box transparent
              label.strokeStyle = 'rgba(0, 0, 0, 0)'; // Also make the border of the color box transparent
            });

            return labelsOriginal;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64 md:h-72 lg:h-[500px] xl:h-[470px]">
      <Bar data={chartData} options={options} plugins={[customLegendPlugin]} />
    </div>
  );
};

export default AssetChart;
