/**
 * Created by wangjunkai on 2017/9/14.
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


const userSchema = new Schema({
  name: String,
  body: String,
  email: String,
  joinDate: {type: Date, default: Date.now},
  lastDate: {type: Date, default: Date.now}
}), User = mongoose.model('User', userSchema);

module.exports = {
  User
};