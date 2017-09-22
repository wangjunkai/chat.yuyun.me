/**
 * Created by wangjunkai on 2017/9/14.
 */
const mongoose = require('mongoose');
const bluebird = require('bluebird');

module.exports = function(){
  mongoose.Promise = bluebird;

  mongoose.connect('mongodb://localhost/chat', {
    useMongoClient: true
  });

  const db = mongoose.connection;
  db.on('error', function (error) {
    console.error('connection  mongodb  error!!!')
  });
  db.on('connected', function () {
    console.log('connection mongodb ok!!!')
  });
};
