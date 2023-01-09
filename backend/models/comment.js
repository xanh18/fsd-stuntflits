const mongoose = require("mongoose");

const commentSchema =  mongoose.Schema({
  discountId: {type: String, required: true},
  value: {type: String, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
