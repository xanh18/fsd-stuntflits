const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema =  mongoose.Schema({
  username: {type: String},
  password: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  role: {type: String}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
