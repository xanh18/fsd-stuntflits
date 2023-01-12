const express = require("express");
const multer = require("multer");
const Discount = require("../models/discount");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const discount = new Discount({
    title: req.body.title,
    categories: req.body.categories,
    expirydate: req.body.expirydate,
    content: req.body.content,
    newprice: req.body.newprice,
    oldprice: req.body.oldprice,
    shop: req.body.shop,
    location: req.body.location,
    imagePath: url + "/images/" + req.file.filename,
    user: req.userData.userId
  });
  discount.save().then(createdDiscount => {

        res.status(201).json({
            message: 'Post added successfully',
            discount: {
                ...createdDiscount,
                id: createdDiscount._id,
            }
        });
    });

});

router.get("/:id", (req, res, next) => {
    Discount.findById(req.params.id).then(discount => {
        if (discount) {
            res.status(200).json({ discount })
        } else {
            res.status(404).json({
                message: "Discount Id niet gevonden"
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
    });
});

router.put("/:id", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }

    const discount = new Discount({
        _id: req.body.id,
        title: req.body.title,
        categories: req.body.categories,
        expirydate: req.body.expirydate,
        content: req.body.content,
        newprice: req.body.newprice,
        oldprice: req.body.oldprice,
        shop: req.body.shop,
        location: req.body.location,
        imagePath: imagePath
    });

  Discount.updateOne({_id: req.params.id}, checkAuth, discount).then(result => {

        res.status(200).json({
            message: "update succesful"
        })

        console.log(result);
    })
})

router.delete("/:id", checkAuth, (req, res, next) => {
    Discount.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result)
        res.status(200).json({ message: "Discount deleted!" })
    });

})

module.exports = router;