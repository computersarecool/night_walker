'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('nightwalkerApp')
  .directive('siteNav', function (UserFactory) {
    return {
      templateUrl: 'partials/navigation.html',
      restrict: 'E',
      controller: 'HeaderCtrl'
    };
  });
