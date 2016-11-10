'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:cartDirective
 * @description
 * # cartDirective
 */
angular.module('nightwalkerApp')
  .directive('siteCart', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/modalcart.html',
      controller: 'LoginCtrl'
    }
  })
