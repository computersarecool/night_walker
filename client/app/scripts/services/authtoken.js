'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.AuthToken
 * @description
 * # AuthToken
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('AuthToken', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
