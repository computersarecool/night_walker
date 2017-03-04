/* global angular */
'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:mouseDownDirective
 * @description
 * # mouseDownDirective
 */
angular.module('nightwalkerApp')
  .directive('siteMouseDown', function () {
    return function (scope, elem, attrs) {
      elem.bind('touchstart', function (e) {
/*        if (e.type === 'mousedown') {
          e.touches = [{
            clientX: e.clientX,
            clientY: e.clientY
          }]
        }

        e.stopPropagation()
        e.preventDefault()
*/
        scope.$event = e
        scope.$apply(attrs['siteMouseDown'])
      })
    }
  })
