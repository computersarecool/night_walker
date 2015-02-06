'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.user
 * @description
 * # user
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('user', function () {
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
