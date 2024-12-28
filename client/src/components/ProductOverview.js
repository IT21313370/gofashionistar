import React, { useState, useEffect } from 'react';

const ProductOverview = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [inStockProducts, setInStockProducts] = useState(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState(0);
  const [onSaleProducts, setOnSaleProducts] = useState(0);

  useEffect(() => {
    // Fetch total products
    fetch('http://localhost:5000/api/total-products')
      .then(response => response.json())
      .then(data => setTotalProducts(data.total_products))
      .catch(error => console.error('Error fetching total products:', error));

    // Fetch in-stock products
    fetch('http://localhost:5000/api/in-stock-products')
      .then(response => response.json())
      .then(data => {
        const inStockCount = data.reduce((total, product) => total + product.in_stock_count, 0);
        setInStockProducts(inStockCount);
      })
      .catch(error => console.error('Error fetching in-stock products:', error));

    // Fetch out-of-stock products
    fetch('http://localhost:5000/api/out-of-stock-products')
      .then(response => response.json())
      .then(data => setOutOfStockProducts(data.out_of_stock_count))
      .catch(error => console.error('Error fetching out-of-stock products:', error));

    // Fetch on-sale products
    fetch('http://localhost:5000/api/on-sale-products')
      .then(response => response.json())
      .then(data => setOnSaleProducts(data.on_sale_count))
      .catch(error => console.error('Error fetching on-sale products:', error));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <h3 className="text-xl font-semibold">Total Products</h3>
        <p className="text-2xl font-bold">{totalProducts}</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg text-center">
        <h3 className="text-xl font-semibold">In-Stock</h3>
        <p className="text-2xl font-bold">{inStockProducts}</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg text-center">
        <h3 className="text-xl font-semibold">Out of Stock</h3>
        <p className="text-2xl font-bold">{outOfStockProducts}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg text-center">
        <h3 className="text-xl font-semibold">On Sale</h3>
        <p className="text-2xl font-bold">{onSaleProducts}</p>
      </div>
    </div>
  );
};

export default ProductOverview;
