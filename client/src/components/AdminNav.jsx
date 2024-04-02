import React from 'react';
import { useLocation, Link } from "react-router-dom";

const AdminNav=()=>{
    return(
        <>
        <div>
           <Link to="/admin"><div>User View</div></Link> 
           <Link to="/userorderview"> <div>Order View</div></Link> 
           <Link to="/adminissueview"><div>Issues View</div></Link> 
        </div>
        </>
    )
}
export default AdminNav;