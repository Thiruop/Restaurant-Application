import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const BucketList = () => {
  const [bucketList, setBucketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formattedTotalPrice, setFormattedTotalPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBucketList = async () => {
      try {
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("userEmail");
        const response = await axios.post("http://localhost:3000/api/bucketlist", { email: userEmail }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBucketList(response.data.bucketList);
        calculateTotalPrice(response.data.bucketList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bucket list:", error);
        setError("Error fetching bucket list. Please try again later.");
        setLoading(false);
      }
    };

    fetchBucketList();
  }, []);

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      item.dishes.forEach((dish) => {
        const price = +dish.dish_price;
        total += price;
      });
    });
    setTotalPrice(total);
    setFormattedTotalPrice(formatPrice(total));
  };

  const handlePayment = async () => {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail")
    const restaurantLocation = localStorage.getItem("restaurantLocation");

    const orderItems = bucketList.reduce((acc, cur) => {
      const { restaurant_name: restaurantName, dishes } = cur;
      const items = dishes.map((dish) => ({
        username: userName,
        dish_name: dish.dish_name,
        restaurant_name: restaurantName,
        price: dish.dish_price,
        location: restaurantLocation
      }));
      return [...acc, ...items];
    }, []);
  
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/api/order", { email: userEmail, order_item: orderItems }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Clear bucket list after successful payment
      await clearBucketList();

      alert(`Total Price: ${formattedTotalPrice}. Payment Successful!`);
      navigate("/trackdown");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const clearBucketList = async () => {
    try {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");
      await axios.post("http://localhost:3000/api/clear", { email: userEmail }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Clear the bucket list locally after successful request
      setBucketList([]);
    } catch (error) {
      console.error("Error clearing bucket list:", error);
    }
  };

  const handleCancel = async (dishName) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/bucketlist/${dishName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBucketList(bucketList.filter(item => !item.dishes.some(dish => dish.dish_name === dishName)));
    } catch (error) {
      console.error("Error cancelling item:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Bucket List</h1>
      {bucketList.length === 0 ? (
        <div>
        <p>No items in the bucket list</p>
        <Link to ="/home"><button> Add Item </button></Link>
        </div>   
      ) : (
        <ul>
          {bucketList.map((item) => (
            <li key={item._id}>
              <h2>{item.restaurant_name}</h2>
              <ul>
                {item.dishes.map((dish) => (
                  <li key={dish._id}>
                    <h3>{dish.dish_name}</h3>
                    <p>Price: {dish.dish_price}</p>
                    <img src={dish.dish_image} alt={dish.dish_name} />
                    <button onClick={() => handleCancel(dish.dish_name)}>Cancel</button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <button onClick={handlePayment}>Pay Now ({formattedTotalPrice})</button>
          <Link to="/home"><button>Add Item</button></Link> 
        </ul>
      )}
    </div>
  );
};

export default BucketList;
