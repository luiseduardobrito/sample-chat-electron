angular
  .module(DEFAULT.PKG())
  .controller('HomeCtrl',
    ['$scope', '$Chat', function ($scope, $Chat) {

      var conf, lol;
      $scope.input = {};

      conf = {
        cursorcolor: "#696c75",
        cursorwidth: "4px",
        cursorborder: "none"
      };

      lol = {
        cursorcolor: "#cdd2d6",
        cursorwidth: "4px",
        cursorborder: "none"
      };

      jQuery(document).ready(function () {

        jQuery(".list-friends").niceScroll(conf);
        jQuery(".messages").niceScroll(lol);

        jQuery("#text").keypress(function (e) {

          if (e.keyCode === 13) {

            // TODO: Send message

            return false;
          }

        });

      });

      $scope.send = function (msg) {

        if (msg && msg.body && msg.body.length) {

          // Save backup for error
          var bkp = angular.copy(msg);

          // TODO
          $Chat
            .send(msg)
            .then(function (response) {

              // TODO

            }, function (error) {

              // TODO
              $scope.input = bkp;

            });

          $scope.input = {};

        }

      };

    }]);