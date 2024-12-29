import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

function Dashboard() {
  const [categoryData, setCategoryData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category-distribution');
        setCategoryData(response.data);
      } catch (err) {
        setError('Error fetching category data');
        console.error(err);
      }
    };

    const fetchPriceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/price-distribution');
        setPriceData(response.data);
      } catch (err) {
        setError('Error fetching price data');
        console.error(err);
      }
    };

    const fetchRatingData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/average-ratings');
        setRatingData(response.data);
      } catch (err) {
        setError('Error fetching rating data');
        console.error(err);
      }
    };

    const fetchBrandData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/brand-distribution');
        setBrandData(response.data);
      } catch (err) {
        setError('Error fetching brand data');
        console.error(err);
      }
    };

    fetchCategoryData();
    fetchPriceData();
    fetchRatingData();
    fetchBrandData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">Graphs</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full flex justify-center items-center">
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-2 text-center">Category Distribution</h2>
            {categoryData.length > 0 ? (
              <Plot
                data={[
                  {
                    x: categoryData.map(item => item.category),
                    y: categoryData.map(item => item.count),
                    type: 'bar',
                    marker: {
                      color: 'rgba(66, 133, 244, 0.8)', // Light blue color
                    },
                  },
                ]}
                layout={{ title: 'Products by Category', xaxis: { title: 'Category' }, yaxis: { title: 'Count' }, autosize: true }}
                useResizeHandler
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <p>Loading category data...</p>
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg w-full flex justify-center items-center">
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-2 text-center">Price Distribution</h2>
            {priceData.length > 0 ? (
              <Plot
                data={[
                  {
                    x: priceData,
                    type: 'histogram',
                    marker: {
                      color: 'rgba(234, 67, 53, 0.8)', // Light red color
                    },
                  },
                ]}
                layout={{ title: 'Price Distribution', xaxis: { title: 'Price' }, yaxis: { title: 'Frequency' }, autosize: true }}
                useResizeHandler
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <p>Loading price data...</p>
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg w-full flex justify-center items-center">
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-2 text-center">Average Ratings by Category</h2>
            {ratingData.length > 0 ? (
              <Plot
                data={[
                  {
                    x: ratingData.map(item => item.category),
                    y: ratingData.map(item => item.avg_rating),
                    type: 'bar',
                    marker: {
                      color: 'rgba(52, 168, 83, 0.8)', // Light green color
                    },
                  },
                ]}
                layout={{ title: 'Average Ratings by Category', xaxis: { title: 'Category' }, yaxis: { title: 'Average Rating' }, autosize: true }}
                useResizeHandler
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <p>Loading rating data...</p>
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg w-full flex justify-center items-center">
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-2 text-center">Products by Brand</h2>
            {brandData.length > 0 ? (
              <Plot
                data={[
                  {
                    labels: brandData.map(item => item.brand),
                    values: brandData.map(item => item.count),
                    type: 'pie',
                    marker: {
                      colors: [
                        'rgba(66, 133, 244, 0.8)', // Blue
                        'rgba(219, 68, 55, 0.8)', // Red
                        'rgba(244, 160, 0, 0.8)', // Orange
                        'rgba(15, 157, 88, 0.8)', // Green
                        'rgba(255, 204, 0, 0.8)', // Yellow
                      ],
                    },
                  },
                ]}
                layout={{ title: 'Products by Brand', autosize: true }}
                useResizeHandler
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <p>Loading brand data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
