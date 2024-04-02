import React from 'react'
const DeliveryPartnerNav=()=>{
    return(
        <>
        <div>
            <div>
                <Link to=""><button>View Pending Orders</button></Link>

            </div>
            <div>
                <Link to=""><button>Delivered Orders</button></Link>
            </div>
        </div>
        </>
    )
}
export default DeliveryPartnerNav;