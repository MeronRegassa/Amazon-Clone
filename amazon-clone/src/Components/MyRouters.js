import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from "../Components/Header";
import Home from "../Components/Home";
import Checkout from './Checkout';
import Login from './Login';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import Payment from './Payment';
import Order from './Order';
import Orders from './Orders';



const promise = loadStripe(
  "pk_test_51MbcfbJd4DMJRgl5hRdbi2DAYfcAG5UlEQsgpKpPelcApOmYJwGM75YJZcFbDbmswl0N6HSr6712IlpMyxgwjalw00lejayj0Y"
);
console.log(promise)
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

function MyRouters() {
  return (
    <div>
      {}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header /> <Home />{" "}
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header /> <Checkout />{" "}
            </>
          }
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/orders" element={
            <>
              <Header /> <Orders />
            </>
          }
        />

        <Route
          path="/payment"
          element={
            <>
              <Header />{" "}
              <Elements stripe={promise}>
                <Payment />
              </Elements>{" "}
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default MyRouters