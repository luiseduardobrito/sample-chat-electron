var hat = require('hat');

// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = require('../config/default').port || process.env.PORT || 3000;

try {
  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });

  // Routing
  app.use(express.static(__dirname + '/public'));

  // Chatroom
  var users = [];

  io.on('connection', function (socket) {

    // when the client emits 'new message', this listens and executes
    socket.on('message.send', function (data) {

      // we tell the client to execute 'new message'
      socket.broadcast.emit('message.received', {
        user: socket.user,
        message: data
      });

    });

    // when the client emits 'add user', this listens and executes
    socket.on('user.login', function (data, ack) {

      // we store the user data in the socket session for this client
      data = data || {};
      data.id = data.id || hat();
      socket.user = data;
      users.push(socket.user);

      // Acknowledge the login
      ack({
        user: socket.user,
        room: users
      });

      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user.joined', {
        user: socket.user,
        room: users
      });

    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('user.typing', function (data) {

      socket.broadcast.emit('user.typing', {
        user: socket.user,
        typing: data.typing
      });

    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('user.typing', function () {

      socket.broadcast.emit('user.typing', {
        user: socket.user,
        typing: data.typing
      });

    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {

      // Remove the user from the room
      if (users && users.length && users.indexOf(socket.user) >= 0) {
        users.splice(users.indexOf(socket.user), 1);
      }

      // echo globally that this client has left
      socket.broadcast.emit('user.left', {
        user: socket.user,
        room: users
      });


    });

  });

} catch (e) {
  console.error(e);
}