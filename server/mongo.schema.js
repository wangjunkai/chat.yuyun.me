/**
 * Created by wangjunkai on 2017/9/14.
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  userType: String,
  joinDate: Date,
  lastLogin: Date,
  isLogin: Boolean,
  socketId:String
});

mongoose.model('users', userSchema);


module.exports = {

  users: mongoose.model('users')
};
