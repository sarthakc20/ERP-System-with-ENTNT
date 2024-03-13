import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import MetaData from "../Layout/MetaData";

const Dashboard = () => { 

  const products = JSON.parse(localStorage.getItem("products")) || [];

  return (
    <>
    <MetaData title={`Dashboard - ERP System`} />
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="metrics">
        <div className="metric-box">
          <div className="metric">
            <h3>Total Products</h3>
            <p>{products.length}</p>
          </div>
        </div>
        <div className="metric-box">
          <div className="metric">
            <h3>Total Orders</h3>
            <p>11</p>
          </div>
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
    </>
  );
};

export default Dashboard;
