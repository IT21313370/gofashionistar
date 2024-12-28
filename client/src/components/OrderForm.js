import React, { useState, useEffect } from 'react';

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [productCount, setProductCount] = useState(1);

  useEffect(() => {
    // Fetch products from the backend
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));

    // Fetch customers from the backend
    fetch('http://localhost:5000/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find(p => p.id === parseInt(productId));
    setSelectedProduct(product);
  };

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    const customer = customers.find(c => c.id === parseInt(customerId));
    setSelectedCustomer(customer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || !selectedCustomer) {
      alert('Please select both a product and a customer.');
      return;
    }
    const order = {
      product_id: selectedProduct.id,
      customer_id: selectedCustomer.id,
      discount,
      product_count: productCount,
    };

    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to place order');
        }
        return response.json();
      })
      .then(data => {
        alert('Order placed successfully');
        // Optionally, reset form fields
        setSelectedProduct(null);
        setSelectedCustomer(null);
        setDiscount(0);
        setProductCount(1);
      })
      .catch(error => {
        console.error('Error placing order:', error);
        alert('Error placing order');
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Place an Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product:
          </label>
          <select
            value={selectedProduct ? selectedProduct.id : ''}
            onChange={handleProductChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - {product.category} - ${product.price}
              </option>
            ))}
          </select>
        </div>

        {/* Display Selected Product Details */}
        {selectedProduct && (
          <div className="p-4 bg-gray-100 rounded-md">
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Color:</strong> {selectedProduct.color}</p>
            <p><strong>Size:</strong> {selectedProduct.size}</p>
          </div>
        )}

        {/* Customer Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer:
          </label>
          <select
            value={selectedCustomer ? selectedCustomer.id : ''}
            onChange={handleCustomerChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} - {customer.address}
              </option>
            ))}
          </select>
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount (%):
          </label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            min="0"
            max="100"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Product Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Count:
          </label>
          <input
            type="number"
            value={productCount}
            onChange={(e) => setProductCount(Number(e.target.value))}
            min="1"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
