const mongoose = require("mongoose");

const discountSchema =  mongoose.Schema({
  title: {type: String, required: true },
  content: {type: String, required: true }
});

module.exports = mongoose.model('Discount', discountSchema);
