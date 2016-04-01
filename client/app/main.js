angular
  .module(DEFAULT.PKG(), [

    // Angular framework modules
    'ngRoute',

    // Custom
    DEFAULT.PKG('socket'),
    DEFAULT.PKG('chat')

  ])

  .config(function ($routeProvider, $locationProvider) {
    $routeProvider

    /*
     * The home route
     */
      .when('/', {
        templateUrl: './app/views/home.html',
        controller: 'HomeCtrl'
      })

      /*
       * The otherwise route (aka. 404)
       */
      .otherwise('/', {

        templateUrl: './app/views/home.html',
        controller: 'HomeCtrl'

      });

  }).controller('BodyCtrl', ['$rootScope', '$location', '$timeout', '$Socket', '$Chat',

  function ($rootScope, $location, $timeout, $Socket, $Chat) {

    /**
     * Gets current angular route or navigate to a new route, if supplied as first argument.
     *
     * @type {Function}
     *
     * @param [p] The destination route
     * @returns {String} The current route after all pending navigation
     */
    $rootScope.path = function (p) {
      return $location.path(p);
    };

    // Expose the services to the root scope
    $rootScope.$Socket = $Socket;
    $rootScope.$Chat = $Chat;

    // Connect the chat using the OS user name
    smalltalk.prompt('Login', 'What\'s your name?', process.env.USER || process.env.username || 'John Doe').then(function (value) {

      $rootScope.$Chat.connect({name: value});

    }, function () {

      // Quit the shole app, without a name there's nothing to do
      require('electron').remote.app.quit();

    });

  }]);