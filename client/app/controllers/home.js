angular
  .module(DEFAULT.PKG())
  .controller('HomeCtrl',
    ['$scope', '$Chat', '$timeout', function ($scope, $Chat, $timeout) {

      var conf, lol;
      $scope.input = {};
      $scope.isTyping = false;

      /**
       * Handles keypress in the message text area.
       *
       * @param {Event} evt The key press event
       * @returns {boolean}
       */
      $scope.keypress = function (evt) {

        if (evt.keyCode === 13 && !evt.shiftKey) {
          $scope.send($scope.input);
          evt.preventDefault();
          return false;
        }

      };

      /**
       * Handles typing text change.
       */
      $scope.typing = function () {

        if (!$scope.isTyping) {

          $scope.isTyping = true;

          $Chat.typing({
            typing: true
          });

          $timeout(function () {

            if($scope.isTyping) {

              $scope.isTyping = false;

              $Chat.typing({
                typing: false
              });

            }

          }, DEFAULT.CHAT.TYPING_TIMEOUT);

        }

      };

      /**
       * Sends a new message in the socket.
       *
       * @param msg
       */
      $scope.send = function (msg) {

        if (msg && msg.body && msg.body.length) {

          $scope.isTyping = false;

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
      });

    }]);