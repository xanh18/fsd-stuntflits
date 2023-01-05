const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: false },
    expirydate: { type: String, required: false },
    content: { type: String, required: true },
    newprice: { type: String, required: false },
    oldprice: { type: String, required: false },
    shop: { type: String, required: false },
    location: { type: String, required: false }
});

module.exports = mongoose.model('Discount', discountSchema);