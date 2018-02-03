let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

var userSchema = new Schema({
  username: {type:String, require},
  password: {type:String, require},
  first_name: {type:String},
  last_name: {type:String},
  email:    {type:String},
  reg_time: {type: Date, default: Date.now}
})

module.exports = mongoose.model("User", userSchema)
