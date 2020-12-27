var socket = io();

socket.on('connect', () => {
    console.log('Connected to the Server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from the Server');
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);
});

