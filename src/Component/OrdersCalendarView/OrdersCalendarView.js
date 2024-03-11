import React, { useState } from "react";
import Calendar from "react-calendar";

const OrdersCalendarView = ({ orders }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filter orders based on selected date
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.expectedDeliveryDate);
    return orderDate.toDateString() === selectedDate.toDateString();
  });

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="orders-calendar-view">
      <h2>Orders Calendar View</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <div className="orders-list">
        <h3>Orders for {selectedDate.toDateString()}</h3>
        <ul>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <li key={order.id}>
                {order.orderId} - {order.customerName}
              </li>
            ))
          ) : (
            <li>No orders for this date</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OrdersCalendarView;
