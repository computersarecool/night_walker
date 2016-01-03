'use strict';

/**
 * @ngdoc filter
 * @name nightwalkerApp.filter:spacefilter
 * @function
 * @description
 * # spacefilter
 * Filter in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .filter('spacefilter', function () {
    return function (input) {
      return input.replace(" ", "-");
    };
  });
