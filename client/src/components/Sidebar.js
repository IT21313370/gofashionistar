import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className=" bg-white-900 text-black h-screen p-4 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 overflow-hidden shadow-lg">

      <ul>
        <li>
          <Link to="/" className="block p-2 hover:bg-blue-700 hover:text-white rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/products" className="block p-2 hover:bg-blue-700 hover:text-white rounded">Products</Link>
        </li>
        <li>
          <Link to="/orders" className="block p-2 hover:bg-blue-700 hover:text-white rounded">Orders</Link>
        </li>
        <li>
          <Link to="/customers" className="block p-2 hover:bg-blue-700 hover:text-white rounded">Chatbot</Link>
        </li>
        <li>
          <Link to="/reports" className="block p-2 hover:bg-blue-700 hover:text-white rounded">Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
