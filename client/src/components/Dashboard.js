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
      <h1 className="text-2xl font-bold mb-4 text-center">Graphs</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full">
          <h2 className="text-xl font-semibold mb-2 text-center">Category Distribution</h2>
          {categoryData.length > 0 ? (
            <Plot
              data={[
                {
                  x: categoryData.map(item => item.category),
                  y: categoryData.map(item => item.count),
                  type: 'bar',
                },
              ]}
              layout={{ title: 'Products by Category', xaxis: { title: 'Category' }, yaxis: { title: 'Count' } }}
            />
          ) : (
            <p>Loading category data...</p>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg w-full">
          <h2 className="text-xl font-semibold mb-2 text-center">Price Distribution</h2>
          {priceData.length > 0 ? (
            <Plot
              data={[
                {
                  x: priceData,
                  type: 'histogram',
                },
              ]}
              layout={{ title: 'Price Distribution', xaxis: { title: 'Price' }, yaxis: { title: 'Frequency' } }}
            />
          ) : (
            <p>Loading price data...</p>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg w-full">
          <h2 className="text-xl font-semibold mb-2 text-center">Average Ratings by Category</h2>
          {ratingData.length > 0 ? (
            <Plot
              data={[
                {
                  x: ratingData.map(item => item.category),
                  y: ratingData.map(item => item.avg_rating),
                  type: 'bar',
                },
              ]}
              layout={{ title: 'Average Ratings by Category', xaxis: { title: 'Category' }, yaxis: { title: 'Average Rating' } }}
            />
          ) : (
            <p>Loading rating data...</p>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg w-full">
          <h2 className="text-xl font-semibold mb-2 text-center">Products by Brand</h2>
          {brandData.length > 0 ? (
            <Plot
              data={[
                {
                  labels: brandData.map(item => item.brand),
                  values: brandData.map(item => item.count),
                  type: 'pie',
                },
              ]}
              layout={{ title: 'Products by Brand' }}
            />
          ) : (
            <p>Loading brand data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
