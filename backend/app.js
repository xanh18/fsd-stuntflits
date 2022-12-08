const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Discount = require('./models/discount');

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/discounts", (req, res, next) => {
  const discount = new Discount({
    title: req.body.title,
    content: req.body.content
  })
  discount.save().then(createdDiscount => {

    res.status(201).json({
      message: 'Post added successfully',
      discountId: createdDiscount._id
    });
  });

});

app.get("/api/discounts", (req, res, next) => {
  Discount.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      discounts: documents
    });
  } );
});

app.delete("/api/discounts/:id",(req,res,next) => {
  Discount.deleteOne({_id: req.params.id}).then(result => {console.log(result)
  res.status(200).json({message: "Discount deleted!"})
  });

})

module.exports = app;
