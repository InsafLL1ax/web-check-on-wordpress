const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('New WebSocket connection established.');

  ws.on('message', function incoming(message) {
    console.log('Received message:', message);
    ws.send(message);
  });

  ws.on('close', function close() {
    console.log('WebSocket connection closed.');
  });
});

server.listen(3002, function() {
  console.log('WebSocket server is running on port 3002');
});
