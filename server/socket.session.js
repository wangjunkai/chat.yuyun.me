/**
 * Created by wangjunkai on 2017/9/12.
 */
const mongoose = require('mongoose');
const {users} = require('./mongo.schema');

module.exports = function (chat) {
  const connect = function (callback) {
    users.findOne({
      socketId: chat.id,
    }, function (err, fUser) {
      if (fUser) {
        if (fUser.isLogin) {
          Object.assign(fUser, {
            isLogin: false,
            lastLogin: new Date(),
            userType: 'login',
            socketId: ''
          });
          fUser.save(function (err, obj) {
            if (obj) {
              callback && callback(obj)
            }
          })
        }
      }
    })
  };

  chat.on('disconnect', (reason) => {
    setTimeout(function () {
      connect()
    }, 1000);
  });
  chat.on('disconnecting', (reason) => {
    setTimeout(function () {
      connect()
    }, 1000);
  });
  chat.on('initAuth', (user, callback) => {
    if (!user)return;
    users.findOne({
      name: user.name,
    }, function (err, fUser) {
      Object.assign(fUser, {
        lastLogin: new Date(),
        socketId: chat.id,
        isLogin: true
      });
      fUser.save(function (err, obj) {
        if (obj) {
          callback(obj)
        }
      })
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
            Object.assign(fUser, {
              isLogin: true,
              lastLogin: new Date(),
              userType: 'login',
              socketId: chat.id
            });
            fUser.save(function (err, obj) {
              if (obj) {
                callback(obj)
              }
            })
          } else {
            callback({error: true, message: '该用户已经登录了!'})
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
    connect(callback)
  });
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