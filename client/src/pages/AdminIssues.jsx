import React, { useState, useEffect } from "react";
import { AdminNav } from '../components';

import axios from "axios";
import { AdminNav } from '../components';

const AdminIssuesView = () => {
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/adminissues");
                setOwners(response.data);
            } catch (error) {
                console.error("Error fetching owners:", error);
            }
        };
        fetchOwners();
    }, []);

    return (
        <div>
                <nav>
                    <AdminNav/>
                </nav>   
             <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Restaurant Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Availability</th>
                        <th>Issues</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner, index) => (
                        <tr key={index}>
                            <td>{owner.name}</td>
                            <td>{owner.restaurant_name}</td>
                            <td>{owner.email}</td>
                            <td>{owner.location}</td>
                            <td>{owner.availability}</td>
                            <td>{owner.issues}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminIssuesView;
