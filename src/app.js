// src/index.ts
const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

// the rest of the example code goes here
app.listen(3000, () => {
  console.log("Your app is now listening on port 3000");
});

const credentials = {
  apikey: process.env.API_KEY,
  password: process.env.PASSWORD,
  hostname: process.env.SHOP,
  version: process.env.VERSION,
};

// Get count of fullfilment orders
app.get("/orderscount", async (req, res) => {
    
  try {
    const resource = "orders";
    const url = `https://e904a293327099bd8cb00513b1af40a4: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@joseleomar-gradi-store.myshopify.com/admin/api/2021-10/orders.json`;
    //const url = `https://jsonplaceholder.typicode.com/todos/1`;
    const response = await axios.get(url);
    const ret = response.data
    return res.json({
      data: ret,
    });
  } catch (error) {
    console.error("Generó error", error);
    return res.status(500).json({
      message: "Falló al realizar la petición",
    });
  }
}) 