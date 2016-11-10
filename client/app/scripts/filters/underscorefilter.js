'use strict'

/**
 * @ngdoc filter
 * @name nightwalkerApp.filter:underscoreFilter
 * @function
 * @description
 * # underscoreFilter
 * Filter in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .filter('underscoreFilter', function () {
    return function (input) {
      return input.replace('-', '_')
    }
  })
