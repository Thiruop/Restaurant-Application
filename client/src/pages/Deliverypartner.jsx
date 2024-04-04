import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import '../assets/css/DeliveryPartner.css' // Import CSS file for styling
 
const DeliveryPartner = () => {
  const [viewOrders, setViewOrders] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { email } = location.state || {};
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/deliveryorders?email=${email}`);
        setViewOrders(response.data.view_orders);
      } catch (error) {
        setError("Error fetching orders. Please try again later.");
      }
    };
 
    if (email) {
      fetchOrders();
    }
  }, [email]);
 
  const handleTrackDownChange = (e, index) => {
    const updatedOrders = [...viewOrders];
    updatedOrders[index].track_down = e.target.value;
    setViewOrders(updatedOrders);
  };
 
  const handleStatusChange = (index) => {
    const updatedOrders = [...viewOrders];
    updatedOrders[index].order_status =
      updatedOrders[index].order_status === "pending" ? "delivered" : "pending";
    setViewOrders(updatedOrders);
  };
 
  const handleSubmit = async (index) => {
    try {
      const orderToUpdate = viewOrders[index];
      const updatedOrder = {
        _id: orderToUpdate._id,
        track_down: orderToUpdate.track_down,
        order_status: orderToUpdate.order_status,
        username: orderToUpdate.username,
        dish_name: orderToUpdate.dish_name,
        restaurant_name: orderToUpdate.restaurant_name,
      };
      await axios.put(`http://localhost:3000/api/orders`, { email, orders: [updatedOrder] });
      console.log("Order updated successfully");
      alert("Data has been updated successfully")
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
 
  return (
    <div>
      <h2 className="table-heading">Received Orders</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Order Name</th>
                <th>Restaurant Name</th>
                <th>Price</th>
                <th>Location</th>
                <th>Order Status</th>
                <th>Track Down</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {viewOrders.map((order, index) => (
                <tr
                  key={index}
                  className={order.order_status === "delivered" ? "delivered-row" : "pending-row"}
                >
                  <td>{order.username}</td>
                  <td>{order.dish_name}</td>
                  <td>{order.restaurant_name}</td>
                  <td>{order.price}</td>
                  <td>{order.location}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={order.order_status === "pending"}
                      onChange={() => handleStatusChange(index)}
                    />
                    Pending
                    <input
                      type="checkbox"
                      checked={order.order_status === "delivered"}
                      onChange={() => handleStatusChange(index)}
                    />
                    Delivered
                  </td>
                  <td>
                    <input
                      type="text"
                      value={order.track_down}
                      onChange={(e) => handleTrackDownChange(e, index)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSubmit(index)}>Submit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
 
export default DeliveryPartner;