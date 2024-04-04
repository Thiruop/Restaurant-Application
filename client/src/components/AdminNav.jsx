import React from 'react';
import { useLocation, Link } from "react-router-dom";
import '../assets/css/Admin.css' 
const AdminNav = () => {
    return (
        <table className="admin-nav-table">
            <thead>
                <tr>
                    <th style={{color:'blue'}}><Link to="/admin">User View</Link></th>
                    <th style={{color:'blue'}}><Link to="/userorderview">Order View</Link></th>
                    <th style={{color:'blue'}}><Link to="/adminissueview">Issues View</Link></th>
                </tr>
            </thead>
        </table>
    )
}
 
export default AdminNav;