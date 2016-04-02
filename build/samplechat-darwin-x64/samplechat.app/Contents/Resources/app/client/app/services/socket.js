angular
  .module(DEFAULT.PKG('socket'), [])
  .factory('$Socket', [function () {

    console.log('$Socket', 'BASE_URL: ' + DEFAULT.API.BASE_URL);

    // Connect to the Socket server
    return {io: new io(DEFAULT.API.BASE_URL)};

  }]);