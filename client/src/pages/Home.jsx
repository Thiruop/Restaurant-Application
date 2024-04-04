import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// added by ikyatha
import "../assets/css/Restaurant.css";
import { UserNav } from "../components";
 
const Home = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
        const token = localStorage.getItem("token");
        if(token && !userName){
            fetchUserData(token);
        }
    }, [userName]);
 
    const fetchUserData = async (token) => {
        try {
            const response = await fetch("http://localhost:3000/api/user", {
                method: "GET",
                headers: {
                    "Authorization":`Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.user) {
                const { name } = data.user;
                localStorage.setItem("userName",name)
                console.log(name,'name home');
                setUserName(name);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/restaurants");
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };
        fetchData();
    }, []);
 
    useEffect(() => {
        const filtered = restaurants.filter(restaurant =>
            restaurant.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.restaurant_status === "open"
        );
        filtered.sort((a, b) => {
            if (a.availability === "close" && b.availability === "open") {
                return 1;
            } else if (a.availability === "open" && b.availability === "close") {
                return -1;
            }
            return 0;
        });
 
        setFilteredRestaurants(filtered);
    }, [searchTerm, restaurants]);
 
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
 
    const handleRestaurantClick = (restaurant) => {
        const { location: restaurantLocation } = restaurant;
        localStorage.setItem("restaurantLocation", restaurantLocation);
        if(restaurant.availability==="close"){
            navigate("/restauranterror")
        }else{
            navigate("/dish", { state: { restaurantData: restaurant } });
        }
       
       
    };
 
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        navigate("/");
    };
 
    return (
        <div>
            <nav className="navmain">
                <div>
                    <span>Welcome Back {userName}</span>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} className="searchinput" />
                    <button className="searchbutton" onClick={handleSearch}>Search</button>
                </div>
                <div>
                    <UserNav />
                </div>
                {/* <div>
                    <button className="link" onClick={handleLogout}>LogOut</button>
                </div> */}
            </nav>
            <main>
                <div className="card-container" >
                    {filteredRestaurants.map((restaurant) => (
                        <div key={restaurant.restaurant_id}  onClick={() => handleRestaurantClick(restaurant)}>
                            <img src={restaurant.restaurant_image} alt={restaurant.restaurant_name} />
                            <h3>{restaurant.restaurant_name}</h3>
                            <p>Location: {restaurant.location}</p>
                            <p>Rating: {restaurant.ratings}</p>
                            <p>Votes: {restaurant.votes}</p>
                            <p>Status: {restaurant.availability}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
 
export default Home;