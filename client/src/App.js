import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ProductOverview from './components/ProductOverview';
import ProductList from './components/ProductList';
import SalesChart from './components/SalesChart';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import OrderForm from './components/OrderForm';
import Reports from './components/Reports';
import ProductClassifier from './components/ProductClassifier';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col sm:flex-row">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <div className="p-4 sm:p-6 h-[calc(100vh-4rem)] overflow-y-auto">
            <Routes>
              <Route path="/" element={<><ProductOverview /><SalesChart /></>} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route path="/orders" element={<OrderForm />} />
              <Route path="/reports" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
