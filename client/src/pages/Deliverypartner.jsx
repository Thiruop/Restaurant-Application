import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
      const updatedOrder = viewOrders[index];
      const updatedData = {
        _id: updatedOrder._id,
        track_down: updatedOrder.track_down,
        order_status: updatedOrder.order_status,
        username: updatedOrder.username,
        dish_name: updatedOrder.dish_name,
        restaurant_name: updatedOrder.restaurant_name
      };
      await axios.put(`http://localhost:3000/api/orders`, { email, orders: [updatedData] });
      console.log({email, orders: [updatedData]});
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  

  return (
    <div>
      <h2>Received Orders</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
        <div>
          <table>
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
                <tr key={index}>
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
                    />Pending
                    <input
                      type="checkbox"
                      checked={order.order_status === "delivered"}
                      onChange={() => handleStatusChange(index)}
                    />Delivered
                  </td>
                  <td>
                    <input
                      type="text"
                      value={order.track_down}
                      onChange={(e) => handleTrackDownChange(e, index)}
                    />
                  </td>
                  <td><button onClick={()=>handleSubmit(index)}>Submit</button></td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        </div>
      )}
    </div>
    
  );
};

export default DeliveryPartner;
