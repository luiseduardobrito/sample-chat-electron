angular
  .module(DEFAULT.PKG('moment'), [])
  .factory('$moment', [function () {

    if (window.moment) {
      return window.moment;
    }

    return {};

  }]);