'use strict';

const http = require('http');
const express = require('express');
const app = express();

const {host,apiPort} = require('./config/express.server');
//socketServer
require('../server/mongo.config')();
const socketServer = require('../server/socket.config');

//配置中间服务器
const server = http.createServer(app);

//链接socket
socketServer(server);
server.listen(apiPort, host, function () {
  console.log('Api Server listening at port %d', apiPort);
});

['SIGINT', 'SIGTERM'].forEach(function (sig) {
  process.on(sig, function () {
    server.close();
    process.exit();
  });
});

