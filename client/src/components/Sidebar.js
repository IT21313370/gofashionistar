import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-slate-900 text-white h-screen p-4 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <div className="flex items-center mb-4">
        <img
          src={`${process.env.PUBLIC_URL}/star.png`}
          alt="Fashionistar Logo"
          className="h-8 w-8 mr-2"
        />
        <h2 className="text-2xl font-bold">Fashionistar</h2>
      </div>
      <ul>
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/products" className="block p-2 hover:bg-gray-700 rounded">Products</Link>
        </li>
        <li>
          <Link to="/orders" className="block p-2 hover:bg-gray-700 rounded">Orders</Link>
        </li>
        <li>
          <Link to="/customers" className="block p-2 hover:bg-gray-700 rounded">Chatbot</Link>
        </li>
        <li>
          <Link to="/reports" className="block p-2 hover:bg-gray-700 rounded">Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
