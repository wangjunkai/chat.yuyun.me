// Setup basic express server
const express = require('express');
const app = express();
const webSocket = require('ws');
const server = require('http').createServer(app);
const wss = new webSocket.Server({server});

const port = 12301;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/client/public'));

wss.on('connection', function connection(ws, req) {
  let time = 1;
  ws.on('message', function (message) {
    ws.send(message + '..' + (time++));
  })
});