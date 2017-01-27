/* global angular */
'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:header
 * @description
 * # header
 */
angular.module('nightwalkerApp')
  .directive('siteHeader', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/header.html',
      controller: 'LoginCtrl'
    }
  })
