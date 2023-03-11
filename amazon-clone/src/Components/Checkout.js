import React from 'react'
import  "./Checkout.css"
import checkoutPic from "../CommonResources/images/amazon-checkout.jpg"
import Subtotal from "../Components/Subtotal"
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import { ListItem } from '@mui/material'


function Checkout() {

  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src={
            "https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          }
          alt=""
        />
        <h1>Hello,</h1>
        <h2 className="checkout__title">Your Shopping Basket</h2>

        {basket.map((item, index) => (
          <CheckoutProduct
            key={index}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
          />
        ))}
      </div>
      <div className="checkout__ad">
        <img src="" alt="" />
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout