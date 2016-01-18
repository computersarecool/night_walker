'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:mouseMoveDirective
 * @description
 * # mouseMoveDirective
 */
angular.module('nightwalkerApp')
  .directive('siteMouseMove', function () {
    return function (scope, elem, attrs) {
      elem.bind('touchmove mousemove', function (e) {

        if (e.type === 'mousemove') {
          e.touches = [{
            clientX: e.clientX,
            clientY: e.clientY,
          }];
        }
        
        scope.$event = e;
        scope.$apply(attrs['siteMouseMove']);
      });
    };
  });

