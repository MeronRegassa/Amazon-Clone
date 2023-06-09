import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import "./Order.css"
import Order from './Order';
import { useStateValue } from './StateProvider';


function Orders() { 
  const [{ basket, user }, dispatch] = useStateValue();


  const [orders, setOrders] =  useState([])
  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs?.map((doc) => ({
              id: doc.id,
              data: doc.data(),
              
            })))
        
        )
    } else {
      setOrders([]);
    }
  
  }, [user]);
  console.log(orders)
  return (
    <div className="orders">
      <h1> Orders </h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;