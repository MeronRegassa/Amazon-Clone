import React from "react";
import "../Components/Payment.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useEffect } from "react";
// import CheckoutProduct from "./CheckoutProduct";
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase'

import { getFirestore, collection, getDocs } from "firebase/firestore";


function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
    const elements = useElements();
      const navigate = useNavigate();


  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

  const [clientSecret, setClientSecret] = useState(true);
  // const stringClientSecret = clientSecret.toString();

    useEffect(() => {
        // Generates the special stripe secret which allows us to change a curtomer
        const getClientSecret = async () => {
            const response = await axios({
              method: "post",
              //Stripe expects the total in a currrencies subunits
              // url: `payments/create?total=${Math.floor(
              //   getBasketTotal(basket) * 100
              // )}`,

              url: `payments/create?total=${
                getBasketTotal(basket) * 100
              }`,
              // after  the url question mark is called query
            });
          // console.log(response);
            setClientSecret(response.data.clientSecret);
        };
        getClientSecret();
    }, [basket]);
  
  console.log('The SECRETE IS >>>>', clientSecret)
    
// changees the buy now butten into processing

  const  handleSubmit = async (event) => {
    event.preventDefault();
      setProcessing(true);
      //asking confermation to charge the clients card.
      
      const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        // console.log(`payload is ${payload}`)
        
        .then(({ paymentIntent }) => { //payment confirmation
          // when there is a user, it creates user, uid, orders, paymentIntent.id
          // sending the doc to firebase db.
          console.log(paymentIntent)
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created, // creates charged date
            });

          // paymentIntent = payment confirmation
          setSucceeded(true);
          setError(null);
          setProcessing(false);

          console.log(basket)
        })
    dispatch({
      type: "EMPTY_BASKET",
    });

    navigate("/orders");
  };

    //  
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    // <div className="payment">
    //   <div className="payment__container">
    //     <h1>
    //       Checkout (<Link to="/checkout">{basket?.length} items </Link>)
    //     </h1>
    //     <div className="payment__section">
    //       <div className="payment__title">
    //         <h3> Delivery Address</h3>
    //       </div>
    //       <div className="payment__address">
    //         <p>{user?.email}</p>
    //         <p>123 React Lane</p>
    //         <p>Chicago, IL</p>
    //       </div>
    //     </div>

    //     <div className="payment__section">
    //       <div className="payment__title">
    //         <h3>Review items and delivery</h3>
    //       </div>
    //       <div className="payment__items">
    //         {basket.map((item) => (
    //           <CheckoutProduct
    //             id={item.id}
    //             title={item.title}
    //             image={item.image}
    //             price={item.price}
    //             rating={item.rating}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //     <div className="payment__section">
    //       <div className="payment__title">
    //         <h3>Payment Method</h3>
    //       </div>
    //       <div className="payment__details">
    //         <form onSubmit={handleSubmit}>
    //           <CardElement onChange={handleChange} />

    //           <div className="payment__priceContainer">
    //             <CurrencyFormat
    //               renderText={(
    //                 value //renders the values as a text.
    //               ) => (
    //                 <>
    //                   <h3>Order Total: {value}</h3>
    //                 </>
    //               )}
    //               decimalScale={2} //go upto two decimal places
    //               value={getBasketTotal(basket)}
    //               displayType={"text"}
    //               thousandSeparator={true} //adds comma on thousands
    //               prefix={"$"}
    //             />
    //             <button disabled={processing || disabled || succeeded}>
    //               <span>{processing ? <p>Processing</p> : "Buy  Now"}</span>
    //             </button>
    //           </div>
    //           {error && <div>{error}</div>}
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="payment">
      <div className="payment__header">
        <h1>
          Checkout
          <Link className="link" to="/checkout">
            ({basket?.length} item)
          </Link>
        </h1>
      </div>
      <div className="payment__section">
        <div className="payment__title">
          <h3>Delivery Address</h3>
        </div>
        <div className="payment__address">
          <p>{user?.email}</p>
          <p>123 Evangadi</p>
          <p>Addis, Ethiopia</p>
        </div>
      </div>
      <div className="payment__section">
        <div className="payment__title">
          <h3>Review items and delivery</h3>
        </div>
        <div className="payment__items">
          {basket?.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="payment__section">
        <div className="payment__title">
          <h3>Payment Method</h3>
        </div>
        <div className="payment__details">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3> Order Total : {value} </h3>}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? "Processing" : "Buy Now"}</span>
              </button>
            </div>
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
