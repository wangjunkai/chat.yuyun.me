/**
 * Created by wangjunkai on 2017/9/12.
 */

const socketServer = require('socket.io');

module.exports = function (server) {
  const io = new socketServer(server);
  const chat = io.of('/chat');

  chat.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
  });

  return server;
};