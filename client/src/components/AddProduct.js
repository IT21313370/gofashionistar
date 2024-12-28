import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [product, setProduct] = useState({
    productName: '',
    brand: '',
    category: '',
    price: '',
    rating: '',
    color: '',
    size: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: product.productName,
      brand: product.brand,
      category: product.category,
      price: parseFloat(product.price),
      rating: parseFloat(product.rating),
      color: product.color,
      size: product.size,
    };
    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/');
        } else {
          console.error('Failed to add product');
        }
      })
      .catch((error) => console.error('Error adding product:', error));
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(product).map((key) => (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type={key === 'price' || key === 'rating' ? 'number' : 'text'}
                id={key}
                name={key}
                value={product[key]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
