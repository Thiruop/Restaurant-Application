import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminNav } from '../components';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users'); 
                setUsers(response.data);
            } catch (error) {
                setError('Error fetching user details. Please try again later.');
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                <nav>
                    <AdminNav/>
                </nav>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.location}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>
            )}
        </div>
        
    );
};

export default Admin;
