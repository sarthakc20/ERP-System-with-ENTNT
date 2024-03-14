import React, { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { MdDelete } from "react-icons/md";
import MetaData from "../Layout/MetaData";
import "./Orders.css";

const Orders = () => {
  const initialOrders = [
    {
      id: 1,
      orderId: "ORD001",
      customerName: "Sarthak Chatterjee",
      orderDate: "2024-03-01",
      status: "Pending",
      expectedDeliveryDate: "2024-03-08", // 7 days after order date
    },
    {
      id: 2,
      orderId: "ORD002",
      customerName: "Sarah Williams",
      orderDate: "2024-03-10",
      status: "Pending",
      expectedDeliveryDate: "2024-03-17", // 7 days after order date
    },
    {
      id: 3,
      orderId: "ORD003",
      customerName: "Rohan Sharma",
      orderDate: "2024-03-09",
      status: "Shipped",
      expectedDeliveryDate: "2024-03-16", // 7 days after order date
    },
    {
      id: 4,
      orderId: "ORD004",
      customerName: "David Anderson",
      orderDate: "2024-03-08",
      status: "Delivered",
      expectedDeliveryDate: "2024-03-15", // 7 days after order date
    },
    {
      id: 5,
      orderId: "ORD005",
      customerName: "Neha Gupta",
      orderDate: "2024-03-28",
      status: "Pending",
      expectedDeliveryDate: "2024-04-04", // 7 days after order date
    },
    {
      id: 6,
      orderId: "ORD006",
      customerName: "Nitin Das",
      orderDate: "2024-03-10",
      status: "Pending",
      expectedDeliveryDate: "2024-03-17", // 7 days after order date
    },
    {
      id: 7,
      orderId: "ORD007",
      customerName: "Don Williams",
      orderDate: "2024-03-11",
      status: "Shipped",
      expectedDeliveryDate: "2024-03-18", // 7 days after order date
    },
    {
      id: 8,
      orderId: "ORD008",
      customerName: "Aniket Paul",
      orderDate: "2024-03-10",
      status: "Pending",
      expectedDeliveryDate: "2024-03-17", // 7 days after order date
    },
    {
      id: 9,
      orderId: "ORD009",
      customerName: "David Anderson",
      orderDate: "2024-03-22",
      status: "Delivered",
      expectedDeliveryDate: "2024-03-29", // 7 days after order date
    },
    {
      id: 10,
      orderId: "ORD0010",
      customerName: "Ankan Sarkar",
      orderDate: "2024-02-04",
      status: "Pending",
      expectedDeliveryDate: "2024-02-11", // 7 days after order date
    },
    {
      id: 11,
      orderId: "ORD0011",
      customerName: "Sarah Young",
      orderDate: "2024-03-10",
      status: "Shipped",
      expectedDeliveryDate: "2024-03-17", // 7 days after order date
    },
  ];

  // State to manage orders and view
  const [orders, setOrders] = useState(initialOrders);
  const [view, setView] = useState("table"); // 'table' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to update order status
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  // Function to delete an order
  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.orderId !== orderId);
    setOrders(updatedOrders);
  };

  // Function to handle date change in calendar view
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Calculate number of orders for each date
  const ordersByDate = orders.reduce((acc, order) => {
    const expectedDeliveryDate = new Date(
      order.expectedDeliveryDate
    ).toDateString();
    acc[expectedDeliveryDate] = (acc[expectedDeliveryDate] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <MetaData title={`Orders Management`} />
      <div className="orders-management">
        <h2>Orders Management</h2>

        <div className="top-navigation">
          <Link to="/" className="dashboard-link">
            <button id="go-to-dashboard">Go to dashboard</button>
          </Link>
        </div>

        <div className="view-toggle">
          <button className="toggle-btn" onClick={() => setView("table")}>
            Table View
          </button>
          <button className="toggle-btn" onClick={() => setView("calendar")}>
            Calendar View
          </button>
        </div>
        {view === "table" ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderId}</td>
                  <td>{order.customerName}</td>
                  <td>{order.orderDate}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.orderId, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => deleteOrder(order.orderId)}
                    >
                      Delete
                    </button>
                    <button
                      className="MediaScreen"
                      onClick={() => deleteOrder(order.orderId)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="calendar-view">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={({ date, view }) => {
                if (view === "month") {
                  const dateKey = date.toDateString();
                  const orderCount = ordersByDate[dateKey];
                  return orderCount > 0 ? (
                    <p style={{ color: "red" }}>{orderCount} Orders</p>
                  ) : null;
                }
              }}
            />
            <div className="orders-list">
              <h3>Expected Order Delivery Date for {selectedDate.toDateString()}</h3>
              <ul>
                {orders.map((order) => {
                  const deliveryDate = new Date(order.expectedDeliveryDate);
                  if (
                    deliveryDate.toDateString() === selectedDate.toDateString()
                  ) {
                    return (
                      <li key={order.id}>
                        {order.orderId} - {order.customerName}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
