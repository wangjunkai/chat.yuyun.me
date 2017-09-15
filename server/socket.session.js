/**
 * Created by wangjunkai on 2017/9/12.
 */
const schema  = require('./mongo.schema');

module.exports = function (chat) {

  chat.on('login', (user,callback) => {
    callback(user)
  });

  return chat;
};