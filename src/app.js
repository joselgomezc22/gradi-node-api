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

const credentials = process.env;

app.get("/orderscount", async (req, res) => {
  try {
    const url = `https://${credentials.API_KEY}:${credentials.API_SECRET_KEY}@${credentials.SHOP}/admin/api/2021-10/orders/count.json?status=open`;
    //const url = `https://jsonplaceholder.typicode.com/todos/1`;
    const response = await axios.get(url);
    const ret = response.data
    return res.json({ 
      data: ret
    });
  } catch (error) {
    console.error("Generó error", error);
    return res.status(500).json({
      message: "Falló al realizar la petición",
    });
  }
}); 

app.get("/customerscount", async (req, res) => {
  try {
    const url = `https://${credentials.API_KEY}:${credentials.API_SECRET_KEY}@${credentials.SHOP}/admin/api/2021-10/customers/count.json`;
    const response = await axios.get(url);
    const ret = response.data
    return res.json({ 
      data: ret,
    });
  } catch (error) {
    console.error("Generó error", error);
    const url = `https://${credentials.API_KEY}:${credentials.API_SECRET_KEY}@${credentials.SHOP}/admin/api/2021-10/customers/count.json`;
    return res.status(500).json({
      message: "Falló al realizar la petición",
      url:url
    });
  }
}); 
app.get("/createhook", async (req, res) => {
  try {
    let obj = {
      "webhook": {
        "topic": "orders/create",
        "address": "https://c7a1-186-154-120-65.ngrok.io/createdOrderHook",
        "format": "json"
        }
      };

    const url = `https://${credentials.API_KEY}:${credentials.API_SECRET_KEY}@${credentials.SHOP}/admin/api/2021-10/webhooks.json`;
    const response = await axios.post(url,obj);
    const ret = response.data
    return res.json({ 
      data: ret,
    });
  } catch (error) {
    console.error("Generó error", error);
    const url = `https://${credentials.API_KEY}:${credentials.API_SECRET_KEY}@${credentials.SHOP}/admin/api/2021-10/webhooks.json`;
    return res.status(500).json({
      message: "Falló al realizar la petición",
      url:url
    });
  }
}); 