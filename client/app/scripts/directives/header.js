'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:header
 * @description
 * # header
 */
angular.module('nightwalkerApp')
  .directive('siteHeader', function () {
    return {
      templateUrl: 'partials/header.html',
      controller: 'LoginCtrl',
      restrict: 'E'
    };
  });
