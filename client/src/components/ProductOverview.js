import React, { useState, useEffect } from 'react';

const ProductOverview = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [inStockCount, setInStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [onSaleProducts, setOnSaleProducts] = useState({});

  useEffect(() => {
    // Fetch all products
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        const total = data.length;
        setTotalProducts(total);

        const inStock = {};
        const outOfStock = {};
        const onSale = {};

        data.forEach(product => {
          if (product.quantity > 0) {
            outOfStock[product.name] = true;
          } else {
            inStock[product.name] = true;
          }
          onSale[product.name] = 0;  // Manually assign 0 for on-sale products
        });

        setInStockCount(Object.keys(inStock).length);
        setOutOfStockCount(Object.keys(outOfStock).length);
        setOnSaleProducts(onSale);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-teal-600 text-white p-4 rounded-lg text-center">
        <h3 className="text-xl font-semibold">Total Products</h3>
        <p className="text-2xl font-bold">{totalProducts}</p>
      </div>
      <div className="bg-green-600 text-white p-4 rounded-lg text-center">
        <h3 className="text-xl font-semibold">In-Stock</h3>
        <p className="text-2xl font-bold">{inStockCount}</p>
      </div>
      <div className="bg-red-600 text-white p-4 rounded-lg text-center">
        <h3 className="text-xl font-semibold">Out of Stock</h3>
        <p className="text-2xl font-bold">{outOfStockCount}</p>
      </div>
      <div className="bg-orange-600 text-white p-4 rounded-lg text-center">
        <h3 className="text-xl font-semibold">On Sale</h3>
        <p className="text-2xl font-bold">0</p>
      </div>
    </div>
  );
};

export default ProductOverview;
