'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:scrollToDirective
 * @description
 * # scrollToDirective
 */
angular.module('nightwalkerApp')
  .directive('siteScrollTo', function () {
    return function (scope, elem, attrs) {
      elem.bind('touchstart mousedown', function () {
        scope.scrollTo(attrs['id'])
      })
    }
  })
