// Establish connection to the server
// since the index.html loaded in the library via CDN, and this is a script file associated w/ it,
// we have access to socket.io

// create a socket.io connection to the provided domain
const socket = io.connect('http://localhost:3001');

// Select HTML elements
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events

// when submit is clicked, tell the socket to emit a 'chat' message, 
// and pass in an object as second param w/ the values to send
// the code to handle this object being sent ALSO needs to be set up on the server side
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

// when someone is typing..
// send a typing message to the server, with handle.value as the data being sent
message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
})


// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle +  ': </strong>' + data.message + '</p>'
})


socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})