'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('nightwalkerApp')
  .directive('siteNav', function ($location) {
    console.log($location.path())
    return {
      restrict: 'E',
      templateUrl: 'partials/nav.html',
      controller: 'LoginCtrl'
    }
  })
