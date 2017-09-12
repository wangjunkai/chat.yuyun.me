/**
 * Created by wangjunkai on 2017/9/12.
 */

const socketServer = require('socket.io');

module.exports = function (server) {
  const app = require('http').createServer(server.middleware);
  const io = new socketServer(app);
  const chat = io.of('/chat');

  io.on('connection', function (socket) {

  })

  return server;
};