/**
 * Created by wangjunkai on 2017/9/14.
 */
const mongoose = require('mongoose');

const mongodb = 'mongodb://localhost:27017/chat';

const db = mongoose.createConnection(mongodb);

db.on('error', function (error) {
  console.error('connection [' + mongodb + '] error!!!')
});
db.on('connected', function () {
  console.log('connection [' + mongodb + '] ok!!!')
});