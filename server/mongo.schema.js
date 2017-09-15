/**
 * Created by wangjunkai on 2017/9/14.
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  type: String,
  join_date: Date,
  last_login: Date,
  is_active: Boolean
});
userSchema.methods.login = function () {
  this.is_active = true;
  this.last_login = new Date();
  return this;
};
const User = mongoose.model('User', userSchema);

module.exports = {
  User
};