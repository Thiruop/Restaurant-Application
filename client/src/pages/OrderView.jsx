import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminNav } from '../components';

const OrderView = () => {
  const [viewOrders, setViewOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/userorders");
        setViewOrders(response.data.view_orders);
      } catch (error) {
        setError("Error fetching orders. Please try again later.");
      }
    };

    fetchOrders();
  }, []);
  return(
    <>
    <nav>
    <AdminNav/>
    </nav>
    <main>
    <div>
      <h2>Order Status</h2>
      {error ? (
        <p>{error}</p>
      ) : (
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
                  <td>{order.order_status}</td>
                  <td>{order.track_down}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

    </main>
    
    </>
  )
};

export default OrderView;
