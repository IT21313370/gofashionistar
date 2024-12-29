import React from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const navigate = useNavigate();

    const handleAddProduct = () => {
      navigate('/products/add');
    };

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
            <div className="flex items-center mb-4">
        <img
          src={`${process.env.PUBLIC_URL}/stars_1.png`}
          alt="Fashionistar Logo"
          className="h-8 w-8 mr-2"
        />
        <h2 className="text-2xl font-bold text-purple-500">Fashionistar</h2>
      </div>
      <div className="text-l font-bold-100 text-gray-500">Product Management Dashboard</div>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 text-white p-2 rounded">Notifications</button>
        {/* <button className="bg-gray-200 text-black p-2 rounded">Profile</button> */}
        <button
          onClick={handleAddProduct}
          className="bg-white-500 text-green-700 px-4 py-2 rounded border border-green-600 border-2 hover:bg-green-600 hover:text-white transition duration-200"
        >
        Add Product
      </button>
      </div>
    </div>
  );
};

export default Topbar;
