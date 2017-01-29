/* global angular */
'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:imagload
 * @description
 * # imageload
 */
angular.module('nightwalkerApp')
  .directive('siteImageLoad', function ($parse) {
    return {
      restrict: 'A',
      scope: {
        loadSuccess: '&',
        loadFail: '&'
      },
      link: function (scope, element, attrs) {
        element.bind('load', () => {
          scope.loadSuccess()
        })
        element.bind('error', () => {
          scope.loadError(attrs.id)
        })
      }
    }
  })
