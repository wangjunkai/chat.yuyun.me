/**
 * Created by wangjunkai on 2017/9/12.
 */
const mongoose = require('mongoose');
const {users} = require('./mongo.schema');

module.exports = function (chat) {
  chat.on('disconnect', (reason) => {
    const a = 1;
  });
  chat.on('disconnecting', (reason) => {
    users.findOne({
      socketId: chat.id,
    }, function (err, fUser) {
      if (fUser) {
        if (fUser.isLogin) {
          fUser.update({
            isLogin: false,
            lastLogin: new Date(),
            userType: 'login',
            socketId: ''
          }).then(function(obj){})
        }
      }
    })
  });

  chat.on('login', (user, callback) => {
    if (!user)return;
    users.findOne({
      name: user.name,
    }, function (err, fUser) {
      if (fUser) {
        if (fUser.password === user.password) {
          if (!fUser.isLogin) {
            fUser.update({
              isLogin: true,
              lastLogin: new Date(),
              userType: 'login',
              socketId: chat.id
            }).then(function (obj) {
              if (obj.ok) {
                callback(fUser)
              }
            });
          } else {
            callback({error: true, message: '该用户已经是登录状态了!'})
          }
        } else {
          callback({error: true, message: '密码错误!'})
        }
      } else {
        callback({error: true, message: '用户不存在!'})
      }
    })
  });
  chat.on('logout', (user, callback) => {

  })
  //注册
  chat.on('register', (modal, callback) => {
    const user = new users({
      name: modal.name,
      email: modal.email,
      password: modal.password,
      isLogin: false,
      joinDate: new Date(),
      userType: 'login'
    });
    users.find({name: modal.name}, function (err, fObj) {
      if (fObj.length <= 0) {
        user.save().then(function (obj) {
          if (obj) {
            callback(obj);
          }
        });
      }
    });

  });
  return chat;
};