import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/Dish.css";
import { UserNav } from "../components";
 
const Dish = () => {
  const location = useLocation();
  const restaurantData = location.state.restaurantData;
 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bucketList, setBucketList] = useState([]);
 
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);
 
  useEffect(() => {
    if (user) {
      setBucketList(user.bucket_list || []);
    }
  }, [user]);
 
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/user", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };
 
  const addToBucketList = async (dish) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User token not found");
      }
 
      if (!user) {
        throw new Error("User data not available");
      }
 
      const newBucketListItem = {
        restaurant_id: restaurantData.restaurant_id,
        restaurant_name: restaurantData.restaurant_name,
        dishes: [
          {
            dish_id: dish.dish_id,
            dish_name: dish.dish_name,
            dish_image: dish.dish_image,
            dish_price: dish.dish_price
          }
        ]
      };
 
      const response = await axios.put(`http://localhost:3000/api/update/edit/${user._id}`, {
        $push: { bucket_list: newBucketListItem }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
 
      if (response.status === 200) {
        alert("Dish added to bucket list!");
        setBucketList([...bucketList, newBucketListItem]);
      } else {
        throw new Error("Failed to add dish to bucket list");
      }
    } catch (error) {
      console.error("Error adding dish to bucket list:", error);
      alert("Error adding dish to bucket list. Please try again later.");
    }
  };
 
  if (loading) {
    return <p>Loading...</p>;
  }
 
  return (
    <div className="admin-con">
       <nav className="navmain">
              <div>
                <h3><b>Dishes</b></h3>
              </div>
              <div>
                    <UserNav  />

                </div>
       </nav> 
      <div className="container mt-4">
        {restaurantData.dishes.map((dish) => (
          <li key={dish.dish_id}>
            <div className="row">
              <div className="col-3">
                <img className="dishimg" src={dish.dish_image} alt={dish.dish_name} />
              </div>
              <div className="col">
                <br />
                <h5>DishName: {dish.dish_name}</h5>
                <br />
                <h6>Price: {dish.dish_price}</h6>
                <p>
                  Description: {dish.dish_detail.description}
                </p>
                <p>
                Ingredients: {dish.dish_detail.ingredients.join(", ")}
                </p>
                <br>
                </br>
                <button className="bucketlist" onClick={() => addToBucketList(dish)}>Bucket List</button>
              </div>
            </div>
          </li>
        ))}
        {bucketList.length > 0 && (
          <Link to={{ pathname: "/bucketlist", state: { bucketList, userEmail: user ? user.email : null }}}>
            <button className="cart">View Cart</button>
          </Link>
        )}
      </div>
    </div>
  );
};
 
export default Dish;