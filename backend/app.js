const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const discountRoutes= ("./routes/discounts");

const app = express();

mongoose.connect("mongodb+srv://xanh1995:welkom123@cluster0.fhmbe54.mongodb.net/?retryWrites=true&w=majority").then(() =>{
  console.log("connected to the database")
}).catch(() => {console.log("connection failed")})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("api/discounts", discountRoutes);

module.exports = app;
