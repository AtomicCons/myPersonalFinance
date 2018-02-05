var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  username: {type:String, require},
  password: {type:String, require},
  first_name: {type:String},
  last_name: {type:String},
  email:    {type:String},
  reg_time: {type: Date, default: Date.now}
})
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)
