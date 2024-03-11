import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Dummy data for demonstration
  const totalProducts = 100;
  const totalOrders = 50;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="metrics">
        <div className="metric">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="metric">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
      </div>
      <div className="navigation">
        <Link to="/products">
          <button>Products Management</button>
        </Link>
        <Link to="/orders">
          <button>Orders Management</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
