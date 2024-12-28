import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch product data from backend API
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  // Update filtered products when search query changes
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) => {
      const {
        name,
        price,
        brand,
        category,
        rating,
        color,
        size,
      } = product;

      return (
        name.toLowerCase().includes(lowerCaseQuery) ||
        price.toString().includes(lowerCaseQuery) ||
        brand.toLowerCase().includes(lowerCaseQuery) ||
        category.toLowerCase().includes(lowerCaseQuery) ||
        rating.toString().includes(lowerCaseQuery) ||
        color.toLowerCase().includes(lowerCaseQuery) ||
        size.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Handler for editing a product
  const handleEditClick = useCallback((productId) => {
    navigate(`/products/edit/${productId}`);
  }, [navigate]);

  // Handler for deleting a product
  const handleDeleteClick = useCallback((productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setProducts((prevProducts) =>
              prevProducts.filter((product) => product.id !== productId)
            );
          } else {
            console.error('Failed to delete product');
          }
        })
        .catch((error) => console.error('Error deleting product:', error));
    }
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products match your search.</p>
      ) : (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left sticky top-0 bg-gray-100">Name</th>
                <th className="p-2 text-left sticky top-0 bg-gray-100">Price</th>
                <th className="p-2 text-left sticky top-0 bg-gray-100">Brand</th>
                <th className="p-2 text-left sticky top-0 bg-gray-100">Category</th>
                <th className="p-2 text-left sticky top-0 bg-gray-100">Rating</th>
                <th className="p-2 text-left sticky top-0 bg-gray-100">Color</th>
                <th className="p-2 text-left sticky top-0 bg-gray-100">Size</th>
                <th className="p-2 text-left sticky top-0 bg-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="border-b p-2">{product.name}</td>
                  <td className="border-b p-2">{product.price}</td>
                  <td className="border-b p-2">{product.brand}</td>
                  <td className="border-b p-2">{product.category}</td>
                  <td className="border-b p-2">{product.rating}</td>
                  <td className="border-b p-2">{product.color}</td>
                  <td className="border-b p-2">{product.size}</td>
                  <td className="border-b p-2">
                    <button
                      onClick={() => handleEditClick(product.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                      aria-label={`Edit ${product.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      aria-label={`Delete ${product.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
