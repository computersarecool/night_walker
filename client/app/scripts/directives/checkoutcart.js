'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:siteCheckoutCart
 * @description
 * # siteCheckoutCart
 */
angular.module('nightwalkerApp')
  .directive('siteCheckoutCart', function ($window, $location, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'partials/checkoutcart.html'
    }
  })
