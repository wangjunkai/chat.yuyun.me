/**
 * Created by wangjunkai on 2017/9/12.
 */

const socketServer = require('socket.io');
const socketSession = require('./socket.session');

module.exports = function (server) {
  const io = new socketServer(server);
  const chat = io.of('/chat');
  chat.on('connection', function (socket) {
    socketSession(socket);
  });

  return server;
};