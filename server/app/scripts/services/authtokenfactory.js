'use strict';

/**
 * @ngdoc service
 * @name serverApp.AuthTokenFactory
 * @description
 * # AuthTokenFactory
 * Factory in the serverApp.
 */
angular.module('serverApp')
  .factory('AuthTokenFactory', function () {
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
