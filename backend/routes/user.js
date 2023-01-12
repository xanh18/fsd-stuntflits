const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const user = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
            .then (result => {
                res.status(201).json({
                    message: 'Gebruiker aangemaakt!',
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    });

});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Login mislukt"
        });
      }
      fetchedUser = user;
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
        return res.status(401).json({
        ok: 0,
        message: 'Auth failed'
        });
      }
      });
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: 'Geldige gebruiker',
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        username: fetchedUser.username
      });
    })
    .catch(err => {
        return res.status(401).json({
          message: "Auth failed"
        });
    });
});


module.exports = router;