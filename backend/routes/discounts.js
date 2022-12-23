const express = require("express");
const Discount = require("../models/discount");


const router = express.router();

router.post("", (req, res, next) => {
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

router.get("/:id", (req, res, next) =>
{
  Discount.findById(req.params.id).then(discount =>
  {
    if(discount)
    {
      res.status(200).json({discount})
    }
    else
    {
      res.status(404).json({
        message:"Discount Id niet gevonden"
      })
    }
  })
});


router.get("", (req, res, next) => {
  Discount.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      discounts: documents
    });
  } );
});

router.put("/:id",(req, res, next) =>
{

  const discount = new Discount({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  Discount.updateOne({_id: req.params.id}, discount).then(result => {

    res.status(200).json({
      message: "update succesful"
    })

    console.log(result);
  })
})

router.delete("/:id",(req,res,next) => {
  Discount.deleteOne({_id: req.params.id}).then(result => {console.log(result)
    res.status(200).json({message: "Discount deleted!"})
  });

})

module.exports = router;
