// Dependencies
const express = require('express'),
    socket = require('socket.io'),
    app = express();

const PORT = 3001;


// Static files
app.use(express.static('public'));

// App setup
var server = app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

// Socket setup by passing our server into the socket fn
var io = socket(server);

// When a client connects, create a socket connection for that client
// in order for this to work, we need to configure socket io
// on the front end as well.
io.on('connection', (socket) => {
    console.log('Made socket connection', socket.id);

    // socket.on acts as the listeners for the server-side socket

    // when the socket recieves a 'chat' object, take the data coming from the server...
    // and send out to all sockets a chat message with that data
    // the client side also needs some code for listeners for the server sending the data back
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })

    // when a typing message is recieved on the server, 
    // broadcast a typing message with the data passed in from the client to 
    // each client, except for the one that sent the broadcast
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })

})


