const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema =  mongoose.Schema({
  username: {type: String},
  password: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  posts: {type: Int32}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);