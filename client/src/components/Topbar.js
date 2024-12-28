import React from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const navigate = useNavigate();

    const handleAddProduct = () => {
      navigate('/products/add');
    };

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      <div className="text-xl font-bold">Product Management Dashboard</div>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 text-white p-2 rounded">Notifications</button>
        {/* <button className="bg-gray-200 text-black p-2 rounded">Profile</button> */}
        <button
        onClick={handleAddProduct}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Product
      </button>
      </div>
    </div>
  );
};

export default Topbar;
