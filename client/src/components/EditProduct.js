import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams(); // Get the product ID from the URL parameters
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

  // Fetch the existing product data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        return response.json();
      })
      .then((data) => {
        // Map the fetched data to match the state structure
        setProduct({
          productName: data.name || '',
          brand: data.brand || '',
          category: data.category || '',
          price: data.price ? data.price.toString() : '',
          rating: data.rating ? data.rating.toString() : '',
          color: data.color || '',
          size: data.size || '',
        });
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
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
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/'); // Redirect to the homepage or another page after successful update
        } else {
          console.error('Failed to update product');
        }
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
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
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
