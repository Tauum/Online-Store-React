import "./Orders.css"
import { useStateValue } from '../StateProvider';
import React, { useEffect, useState } from 'react'
import Order from './Order';


function Orders() {

   const [{ user, cart, orders, ipaddress }, dispatch] = useStateValue();


   useEffect(() => {
      if (user.id){

         fetch(`${ipaddress}/Order/user/${user.id}`)
         .then(res => res.json())
         .then(response => {
            console.log(response)
            
            dispatch({
               type: "UPDATE_USER_ORDERS", orders: response 
            })

         })
      }

   },[])



    return (
        
    <div className="orders">
       <h1>Orders</h1> 
       <div className="orderList">
           {orders?.map((order, index) => (
              <Order order={order} key={index} className="order"/>
           ))}
       </div>
    </div>
  )
}

export default Orders