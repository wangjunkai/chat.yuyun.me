/**
 * Created by wangjunkai on 2017/9/12.
 */
const mongoose = require('mongoose');
const {
  users, ships
} = require('./mongo.schema');

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
    if (!user) return;
    users.findOne({
      name: user.name,
    }, function (err, fUser) {
      Object.assign(fUser, {
        lastLogin: new Date(),
        socketId: chat.id,
      });
      fUser.save(function (err, obj) {
        if (obj) {
          callback(obj)
        }
      })
    })
  });
  chat.on('login', (user, callback) => {
    if (!user) return;
    users.findOne({
      name: user.name,
    }, function (err, fUser) {
      if (fUser) {
        if (fUser.password === user.password) {
          if (!fUser.isLogin) {
            Object.assign(fUser, {
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
            callback({
              error: true,
              message: '该用户已经登录了!'
            })
          }
        } else {
          callback({
            error: true,
            message: '密码错误!'
          })
        }
      } else {
        callback({
          error: true,
          message: '用户不存在!'
        })
      }
    })
  });
  chat.on('logout', (user, callback) => {
    callback(true)

  });
  //注册
  chat.on('register', (modal, callback) => {
    const user = new users({
      name: modal.name,
      email: modal.email,
      password: modal.password,
      isLogin: false,
      joinDate: new Date(),
      userType: 'login',
      friends_list: {}
    });
    users.find({
      name: modal.name
    }, function (err, fObj) {
      if (fObj.length <= 0) {
        user.save().then(function (obj) {
          if (obj) {
            callback(obj);
          }
        })
      }
    })
  });
  chat.on('getShip', (_id, callback) => {
    ships.findOne({
      ship_id: _id
    }, function (err, fUser) {
      callback(fUser)
    })
  })
  /*搜索好友*/
  chat.on('searchFriends', (obj, callback) => {
    users.find({
      _id: {$ne: obj._id},
      $or: [{'email': obj.value}, {'name': new RegExp('.*' + obj.value + '.*')}]
    }, function (err, fObj) {
      delete obj._id
      obj.list = fObj;
      callback(obj);
    })
  });
  /*添加好友*/
  chat.on('askFriends', (obj, callback) => {
    ships.findOne({ship_id: obj._id}, function (err, shipUser) {
      const ship = shipUser ? shipUser : new ships({
        ship_id: obj._id
      });

      ship.save().then(function (shipObj) {
        users.findOne({_id: obj._sign}, function (err, requestUser) {
          shipObj.ship_list || (shipObj.ship_list = {})
          Object.assign(shipObj.ship_list, {
            [obj._sign]: Object.assign({}, requestUser._doc, {
              status: 2,
              requestDate: new Date()
            })
          })
          ships.update({_id: shipObj._id}, {
            $set: {
              'ship_list': shipObj.ship_list
            }
          }).then(function (obj) {
            if (obj) {
              callback(obj)
            }
          })
        })
      })
    })
  });
  /*添加好友*/
  chat.on('addFriends', (obj, callback) => {
    ships.findOne({ship_id: obj._sign}, function (err, shipUser) {
      Object.assign(shipUser.ship_list, {
        [obj._id]: Object.assign({}, shipUser.ship_list[obj._id], {
          status: 1
        })
      })
      ships.update({_id: shipUser._id}, {
        $set: {
          'ship_list': shipUser.ship_list
        }
      }).then(function (obj) {
        if (obj) {
          callback(shipUser)
        }
      })
    })
  })
  /*删除好友*/
  chat.on('removeFriends', (obj, callback) => {
    ships.findOne({ship_id: obj._sign}, function (err, shipUser) {
      delete shipUser.ship_list[obj._id];
      ships.update({_id: shipUser._id}, {
        $set: {
          'ship_list': shipUser.ship_list
        }
      }).then(function (obj) {
        if (obj) {
          callback(shipUser)
        }
      })
    })
  })
  return chat;
};
