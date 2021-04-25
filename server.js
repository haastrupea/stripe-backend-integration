require('dotenv-defaults').config()
const express = require("express");

const app = express();
const API_KEY = process.env.STRIPE_KEY || ''

const { resolve } = require("path");

// This is your real test secret API key.

const stripe = require("stripe")(API_KEY);

app.use(express.static("."));

app.use(express.json());

// The ConnectionToken's secret lets you connect to any Stripe Terminal reader

// and take payments with your Stripe account.

// Be sure to authenticate the endpoint for creating connection tokens.

app.get('/',(req,res)=>{
  res.json({status:true,messge:"I am up and running"})
})
app.post("/connection_token", async(req, res) => {

  let connectionToken = await stripe.terminal.connectionTokens.create();

  res.json({secret: connectionToken.secret});

})

app.post("/capture_payment_intent", async(req, res) => {

  const intent = await stripe.paymentIntents.capture(req.body.id);

  res.send(intent);

})

app.listen(process.env.PORT || 4242, () => console.log('Node server listening on port 4242!'));
