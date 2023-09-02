const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// let count = 0;

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.emit('message', 'Welcome!');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    })

    // socket.emit('countUpdated', count); // emit for current socket connection
    // socket.on('increment', () => {
    //     count++;
    //     // socket.emit('countUpdated', count);
    //     io.emit('countUpdated', count); // emit for all socket connections
    // })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})