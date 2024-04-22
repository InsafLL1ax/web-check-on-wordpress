const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

// Создаем HTTP-сервер с помощью Express
const server = http.createServer(app);

// Создаем сервер WebSocket на основе HTTP-сервера
const wss = new WebSocket.Server({ server });

// Слушаем событие подключения нового клиента к серверу WebSocket
wss.on('connection', function connection(ws) {
  console.log('New WebSocket connection established.');

  // Обрабатываем сообщения от клиента
  ws.on('message', function incoming(message) {
    console.log('Received message:', message);

    // Отправляем обратно клиенту тот же текстовый сообщение, которое он отправил нам
    ws.send(message);
  });

  // Обрабатываем событие закрытия соединения с клиентом
  ws.on('close', function close() {
    console.log('WebSocket connection closed.');
  });
});

// Запускаем сервер на порту 3000
server.listen(3002, function() {
  console.log('WebSocket server is running on port 3002');
});
