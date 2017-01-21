'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('nightwalkerApp')
  .directive('siteNav', function ($location) {
    return {
      restrict: 'E',
      templateUrl: 'partials/nav.html',
      controller: 'LoginCtrl'
    }
  })
