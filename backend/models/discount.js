const mongoose = require("mongoose");

<<<<<<< HEAD
const discountSchema = mongoose.Schema({
    title: { type: String, required: true },
    categories: { type: String, required: false },
    expirydate: { type: String, required: false },
    content: { type: String, required: true },
    newprice: { type: String, required: false },
    oldprice: { type: String, required: false },
    shop: { type: String, required: false },
    location: { type: String, required: false },
    date: { type: Date },
    imagePath: { type: String, required: true }
=======
const discountSchema =  mongoose.Schema({
  title: {type: String, required: true },
  content: {type: String, required: true },
  imagePath: {type: String, required: true}
>>>>>>> parent of f4729b9 (Merge pull request #1 from xanh18/sf-D)
});

module.exports = mongoose.model('Discount', discountSchema);
