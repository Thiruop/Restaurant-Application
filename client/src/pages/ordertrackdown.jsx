import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/TrackDown.css"; 

const TrackDown = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                    return;
                }

                const response = await axios.get("http://localhost:3000/api/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const { user } = response.data;
                setUserData(user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleGotIt = async (restaurantName, dishName, orderStatus, trackDown) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
                return;
            }

            await axios.put("http://localhost:3000/api/deletetrackdown", {
                userName: userData.name, 
                restaurantName,
                dishName,
                orderStatus,
                trackDown
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
           await fetchUserData();
        } catch (error) {
            console.error("Error deleting trackdown data:", error);
        }
    };

    return (
        <div className="center-container"> 
            <main className="main">
                <div>
                    <p className="title">Track Your Orders: {userData.name}</p>
                </div>
                <div>
                    {userData.track_down && userData.track_down.map((item, index) => (
                        <div key={index} className="order-container">
                            <p>Restaurant: {item.restaurantname}</p>
                            <p>Dish: {item.dishname}</p>
                            <p>Track Down: {item.trackdown}</p>
                            <p>Order Status: {item.orderstatus}</p>
                            {item.orderstatus === "delivered" && (
                                <button onClick={() => handleGotIt(item.restaurantname, item.dishname, item.orderstatus, item.trackdown)}>Got It</button>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default TrackDown;
