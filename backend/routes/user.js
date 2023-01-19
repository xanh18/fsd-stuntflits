const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const user = require("../models/user");
const checkAuth = require("../middleware/check-auth");
const Discount = require("../models/discount");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
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
        userId: fetchedUser._id
      });
    })
    .catch(err => {
        return res.status(401).json({
          message: "Auth failed"
        });
    });
});

router.get("", (req, res, next) =>
{
  User.find({role: null}).then(users => {
    if (users) {
      res.status(200).json({users: users})
    } else {
      res.status(404).json({
        message: "Users niet gevonden"
      });
    }
  });
});

router.delete("/:email", (req, res, next) => {
  const user = User.find({email: req.params.email});

  User.deleteOne({email: req.params.email}).then(result => {
    res.status(200).json({message: "User"})
  });

});
router.get("/profile/:id", (req, res, next) => {
  User.findById(req.params.id).then(user => {
      if (user) {
          res.status(200).json({ user })
      } else {
          res.status(404).json({
              message: "User niet gevonden"
          })
      }
  })
});

router.put("/edit/:id", (req, res, next) => {

  console.log(req.body.email,req.body.firstname,req.body.lastname);
  User.updateOne({_id: req.params.id}, {$set: {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }}).then(result => {

      res.status(200).json({
          message: "update succesful"
      })

      console.log(result);
  })
})


module.exports = router;
