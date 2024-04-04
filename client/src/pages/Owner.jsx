import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../assets/css/Owner.css";

const Owner = () => {
    const location = useLocation();
    const { email } = location.state || {};

    const [ownerDetails, setOwnerDetails] = useState({});
    const [availability, setAvailability] = useState("open");
    const [issue, setIssue] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOwnerDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ownerDetails?email=${email}`);
                setOwnerDetails(response.data);
            } catch (error) {
                console.error("Error fetching owner details:", error);
                setError("Error fetching owner details. Please try again later.");
            }
        };

        if (email) {
            fetchOwnerDetails();
        }
    }, [email]);

    const handleAvailabilityChange = (e) => {
        setAvailability(e.target.value);
    };

    const handleIssueChange = (e) => {
        setIssue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:3000/api/saveIssue", {
                username: ownerDetails.name,
                restaurant: ownerDetails.restaurant_name,
                email,
                availability,
                issue
            });
            console.log("Data submitted successfully:", response.data);
            // Handle success, redirect or display a success message
           // alert("sucess");
        } catch (error) {
            console.error("Error submitting data:", error);
            // Handle error, display an error message to the user
        }
    };

    return (
        <div className="owner-container">
            <h1>Welcome Owner</h1>
            {error && <p>{error}</p>}
            <div className="owner-info">
                <h5><p style={{marginLeft:"100px"}}>Hi {ownerDetails.name}!</p></h5>
                <h5><p>Restaurant Name: {ownerDetails.restaurant_name}</p></h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="select-container">
                    <label>
                        <h4>Availability:</h4>
                        <select value={availability} onChange={handleAvailabilityChange}>
                            <option value="open">Open</option>
                            <option value="close">Close</option>
                        </select>
                    </label>
                </div>
                <div className="issue-container">
                    <label>
                        <h4>Issue:</h4>
                        <input type="text" value={issue} onChange={handleIssueChange} />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Owner;
