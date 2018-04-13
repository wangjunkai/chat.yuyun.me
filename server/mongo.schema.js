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
  socketId: String,
  friends_list: Object
});
const relationshipSchema = new Schema({
  ship_id: String,
  ship_list: Object
});

mongoose.model('users', userSchema);
mongoose.model('ships', relationshipSchema);


module.exports = {
  ships: mongoose.model('ships'),
  users: mongoose.model('users')
};
