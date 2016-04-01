/**
 * Created by luis on 4/1/16.
 */
angular
  .module(DEFAULT.PKG('settings'), ['ngStorage'])
  .service('$Settings', ['$sessionStorage', function ($storage) {

    /**
     * Instantiates a new Settings service.
     *
     * @param storage The ngStorage module
     * @constructor
     */
    var SettingsService = function (storage) {

      storage.$default({
        settings: {}
      });

      this.cache = storage.settings;

    };

    /**
     * Clears the user settings.
     */
    SettingsService.prototype.clear = function () {
      this.user(null);
    };

    /**
     * Gets or sets the current user information. To clear pass val=null.
     *
     * @param {Object} [val] The value to be set.
     * @returns {SettingsService.user|null}
     */
    SettingsService.prototype.user = function (val) {

      var self = this;

      if (val === null || val === false) {

        self.cache.user = null;

      } else if (val) {

        self.cache.user = val || self.cache.user || {};

      }

      return this.cache.user;

    };

    // Create a new settings service.
    return new SettingsService($storage);

  }]);