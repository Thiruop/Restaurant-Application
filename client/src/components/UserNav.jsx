import React from 'react';
import { Link, useNavigate } from "react-router-dom"; 

const UserNav=()=>{
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate("/");
};
    return( 
         <nav className="user-nav">
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'right', padding: '10px' }}>
      <Link to="/home" className="link">Home</Link>
      <Link to="/trackdown" className="link">Trackorder</Link>
      <Link to="/bucketlist" className="link">View Cart</Link>
      <Link to="/" className="link" onClick={handleLogout}>Log Out</Link>
    </div>
  </nav>
    )
}
export default UserNav;