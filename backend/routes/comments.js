const express = require("express");
const Comment = require("../models/comment");
const Discount = require("../models/discount");

const checkAuth = require("../middleware/check-auth");


const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  const comment = new Comment({
    discountId: req.body.discountId,
    value: req.body.value
  })
  comment.save().then(createdComment => {

    res.status(201).json({
      message: 'Post added successfully',
      discountId: createdComment._id
    });
  });

});

router.get("/:id", (req, res, next) =>
{
  Comment.find({discountId: req.params.id}).then(comment =>
  {
    if(comment)
    {
      res.status(200).json({comment: comment})
    }
    else
    {
      res.status(404).json({
        message:"CommentId niet gevonden"
      })
    }
  })
});

router.delete("/:id", checkAuth, (req,res,next) => {
  Comment.deleteOne({_id: req.params.id}).then(result => {console.log(result)
    res.status(200).json({message: "Comment deleted!"})
  });

})

module.exports = router;