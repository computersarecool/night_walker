'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:mouseUpDirective
 * @description
 * # mouseUpDirective
 */
angular.module('nightwalkerApp')
  .directive('siteMouseUp', function () {
    return function (scope, elem, attrs) {
      elem.bind('touchend mouseup', function (e) {
        scope.$apply(attrs['siteMouseUp']);
      });
    };
  });

