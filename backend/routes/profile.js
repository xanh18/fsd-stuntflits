const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:id", (req, res, next) =>
{
  user.findById(req.params.id).then(discount =>
  {
    if(user)
    {
      res.status(404).json({
        message:"User niet gevonden"
      })
    }
    else
    {
        res.status(200).json({discount})
    }
  })
});

module.exports = router;