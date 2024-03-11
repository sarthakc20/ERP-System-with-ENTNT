import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from "./Component/Dashboard/Dashboard.js";
import Products from "./Component/Products/Products.js";
import Orders from "./Component/Orders/Orders.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
