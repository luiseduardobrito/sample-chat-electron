angular
  .module(DEFAULT.PKG(), [

    // Angular framework modules
    'ngRoute',

    // Custom
    DEFAULT.PKG('socket')

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

  }).controller('BodyCtrl', ['$rootScope', '$location', '$timeout', '$Socket',

  function ($rootScope, $location, $timeout, $Socket) {

    // Expose the socket service to the root scope
    $rootScope.$Socket = $Socket;

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

  }]);