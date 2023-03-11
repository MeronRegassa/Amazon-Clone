
require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

//  const { response } = require("express");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//  -App config

const app = express();

//  - Middleware

app.use(cors({origin: true}));
app.use(express.json());

//   Api routes

app.get("/", (request, response) => response.status(200).send("Hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request received for this amount >>>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  //    OK - created

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//  - Listen command

exports.api = functions.https.onRequest(app);

