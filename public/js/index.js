var socket = io();

socket.on('connect', () => {
    console.log('Connected to the Server');

    socket.emit('createMessage', {
        to: 'Andrew',
        text: 'Yup!'
    });

});

socket.on('disconnect', () => {
    console.log('Disconnected from the Server');
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);
});

