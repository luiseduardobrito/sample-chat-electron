angular
  .module(DEFAULT.PKG('socket'), [])
  .factory('$Socket', [function() {

    // Connect to the Socket server
    return new io(DEFAULT.API.BASE_URL);

  }]);