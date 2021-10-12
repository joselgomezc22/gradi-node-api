// src/index.ts
const express    = require("express");
const axios      = require("axios");
const cors       = require("cors");
const nodemailer = require("nodemailer");
const getRawBody = require('raw-body')
const SMTPPool   = require("nodemailer/lib/smtp-pool");
require("dotenv").config();

const app        = express();
app.use(cors());

// the rest of the example code goes here
app.listen(3000, () => {
  console.log("Your app is now listening on port 3000");
});

const credentials = process.env;
const globaApilUrl =`https://${credentials.API_KEY}:${credentials.API_SECRET_KEY}@${credentials.SHOP}/admin/api/2021-10/`;

async function sendCustomerInvite(customerId){
  try{
    const url = `${globaApilUrl}/customers/${customerId}/send_invite.json`;
    const response = await axios.post(url);
    const ret = response.data
    return res.json({ 
      data: ret
    });

    
  }catch(error){

  }
}


app.get("/orderscount", async (req, res) => {
  try {
    const url = `${globaApilUrl}orders/count.json?status=open`;
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
    const url = `${globaApilUrl}customers/count.json`;
    const response = await axios.get(url);
    const ret = response.data
    return res.json({ 
      data: ret,
    });
  } catch (error) {
    console.error("Generó error", error);
    const url = `${globaApilUrl}customers/count.json`;
    return res.status(500).json({
      message: "Falló al realizar la petición",
      url:url
    });
  }
}); 


app.post("/createdOrderHook", async (req, res) => {

  const body = await getRawBody(req);
  const order = JSON.parse(body.toString());
  try{
    if (order.customer && order.customer.state === "disabled") {
      //const url = `${globaApilUrl}customers/${order.customer.id}/send_invite.json`;

      //await axios.post(url);
      await sendCustomerInvite(order.customer.id);
      return res.status(200);
    }
   }catch(error){ 
    console.log(error) 
  }
  
});




app.get("/hookDelete", async (req, res) => { 
  try{
    const webhookId = '1052321841361';
    const url = `${globaApilUrl}webhooks/${webhookId}.json`;
    const response = await axios.delete(url);
    const ret = response.data
    return res.json({ 
      data: ret,
    });
  } catch (error) {
    console.error("Generó error", error);
    const url = `${globaApilUrl}webhooks.json`;
    return res.status(500).json({
      message: error,
      url:url
    });
  }  
});

app.get("/hookList", async (req, res) => {
  try{
    const url = `${globaApilUrl}webhooks.json`;
    const response = await axios.get(url);
    const ret = response.data
    return res.json({ 
      data: ret,
    });
  } catch (error) {
    console.error("Generó error", error);
    const url = `${globaApilUrl}webhooks.json`;
    return res.status(500).json({
      message: error,
      url:url
    });
  }
});

app.get("/createhook2", async (req, res) => {
  try {
    let obj = {
      "webhook": {
        "topic": "orders/create",
        "address": "https://2817-190-146-238-178.ngrok.io/createdOrderHook2",
        "format": "json"
        }
      };
    const url = `${globaApilUrl}webhooks.json`;
    const response = await axios.post(url,obj);
    const ret = response.data
    console,log('hook creado');
    return res.json({ 
      data: ret,
    });
  } catch (error) {
    console.error("Generó error", error);
    const url = `${globaApilUrl}webhooks.json`;
    return res.status(500).json({
      message: error,
      url:url
    });
  }
}); 

app.get("/emailTest", async (req, res) => { 
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ora.welch91@ethereal.email',
        pass: 'a7fkvv6MytHsm9xpYr'
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <ora.welch91@ethereal.email>', // sender address
    to: "joselgomezc1@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});