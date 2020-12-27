const path = require('path');  
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);
var io = require('socket.io')(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("New User Conneted");

  socket.emit('newMessage', {
    from: 'mike',
    text: "hey!",
    createAt: "20199009"
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)
  });

  socket.on('disconnect', () => {
    console.log("User Disconnected");
  })

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
