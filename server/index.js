var pkg = require('../package');
var hat = require('hat');

// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || require('../config/default').port || 3000;

try {
  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });

  // Routing
  app.use(express.static(__dirname + '/public'));

  // Chatroom
  var room = {
    users: [],
    messages: []
  };

  io.on('connection', function (socket) {

    // when the client emits 'new message', this listens and executes
    socket.on('message.send', function (data, ack) {

      // Prepare the message
      data.id = hat();
      data.timestamp = Date.now();
      data.user = socket.user;

      // Ack the user
      ack(data);

      // we tell the client to execute 'new message'
      socket.broadcast.emit('message.received', data);

      // add to the cache
      room.messages = room.messages || [];
      room.messages.push(data);

      // Log the message received
      console.log('[message.send] ' + socket.user.name + ': ' + data.body);

    });

    // when the client emits 'add user', this listens and executes
    socket.on('user.login', function (data, ack) {

      // we store the user data in the socket session for this client
      data = data || {};
      data.id = data.id || hat();
      data.image = 'https://api.adorable.io/avatars/100/' + data.id + '.png';

      socket.user = data;
      room.users = room.users || [];
      room.users.push(socket.user);

      // Acknowledge the login
      ack({
        user: socket.user,
        room: room.users,
        messages: room.messages
      });

      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user.joined', {
        user: socket.user,
        room: room.users,
        messages: room.messages
      });

      // Log the user connected
      console.log('[user.login] ' + socket.user.name + ' (#' + socket.user.id + ')');

    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('user.typing', function (data) {

      socket.broadcast.emit('user.typing', {
        user: socket.user,
        typing: data.typing
      });

      // Log the user connected
      console.log('[user.typing] ' + socket.user.name + (data.typing ? ' is' : ' stopped') + ' typing (#' + socket.user.id + ')');

    });
    // when the user disconnects.. perform this
    socket.on('disconnect', function () {

      // Remove the user from the room
      if (room && room.users && room.users.length && room.users.indexOf(socket.user) >= 0) {
        room.users.splice(room.users.indexOf(socket.user), 1);
      }

      // echo globally that this client has left
      socket.broadcast.emit('user.left', {
        user: socket.user,
        room: room.users,
        messages: room.messages
      });

      // Log the user connected
      console.log('[user.left] ' + socket.user.name + ' (#' + socket.user.id + ')');

    });

    var timestamp = Date.now();

    app.get('/', function (req, res) {

      var info = JSON.parse(JSON.stringify(pkg));

      delete info.scripts;
      delete info.main;
      info.dependencies = Object.keys(info.dependencies);
      info.uptime = Date.now() - timestamp;

      res.json(info)

    });

  });

} catch (e) {
  console.error(e);
}