const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema =  mongoose.Schema({
  username: {type: String},
  password: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  firstname: {type: String},
  lastname: {type: String},
  role: {type: String, required: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
