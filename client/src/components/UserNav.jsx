import React from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

const UserNav=({ userName, handleLogout })=>{
    return( 
         <nav className="user-nav">
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right', padding: '10px' }}>
      <Link to="/home" className="link">Home</Link>
      <Link to="/trackdown" className="link">Trackorder</Link>
      <Link to="/bucketlist" className="link">View Cart</Link>
      <Link to="/" className="link">Log Out</Link>
    </div>
  </nav>
    )
}
export default UserNav;