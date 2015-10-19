'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('nightwalkerApp')
  .directive('siteNav', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/navigation.html'
    };
  });
