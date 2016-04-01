/**
 * Created by luis on 4/1/16.
 */
angular
  .module(DEFAULT.PKG('chat'), [DEFAULT.PKG('socket')])
  .service('$Chat', ['$Socket', '$rootScope', function ($Socket, $rootScope) {

    /**
     * Instantiates a new Chat Service.
     *
     * @constructor
     */
    var ChatService = function (socket) {

      this.socket = socket;

      // The initial service cache
      // TODO: Get from local storage
      this.cache = {
        user: null,
        connected: false
      };

      // Register socket callbacks
      this.socket.on('user.login', this.onLogin);
      this.socket.on('user.joined', this.onUserJoined);
      this.socket.on('message.received', this.onMessageReceived);
      this.socket.on('disconnect', this.onDisconnect);

    };

    /**
     * Clears the chat service cache.
     */
    ChatService.prototype.clear = function clear() {

      // Clears the cache
      this.cache = {
        user: null,
        connected: false
      }

    };

    /**
     * Gets current user information.
     *
     * @returns {{}|null}
     */
    ChatService.prototype.user = function () {
      return this.cache.user;
    };

    /**
     * Gets the current user list in the room.
     *
     * @returns {Array}
     */
    ChatService.prototype.room = function () {
      return this.cache.room || [];
    };

    /**
     * Connect to the chat room.
     */
    ChatService.prototype.connect = function (data, ack) {

      var self = this;

      // TODO: notify observers
      self.socket.emit('user.login', data, function (response) {

        $rootScope.$apply(function () {

          self.cache.connected = true;
          self.cache.user = response.user;
          self.cache.room = response.room;

          console.log(response);
          (ack || angular.noop)();

        });

      });

    };

    /**
     * Handles the disconnect callback in the Socket.
     */
    ChatService.prototype.onDisconnect = function (data, ack) {

      console.log('onDisconnect', data);

      // TODO: notify observers
      alert('Disconnected!');
      clear();

      (ack || angular.noop)();

    };

    /**
     * Handles the user joined callback in the Socket.
     */
    ChatService.prototype.onUserJoined = function (data, ack) {

      console.log('onUserJoined', data);

      // TODO: notify observers
      (ack || angular.noop)();

    };

    /**
     * Handles the message received callback in the Socket.
     */
    ChatService.prototype.onMessageReceived = function (data, ack) {

      console.log('onMessageReceived', data);

      // TODO: notify observers
      (ack || angular.noop)();

    };

    return new ChatService($Socket.io);

  }]);
