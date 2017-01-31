/* global angular */
'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:sizeGuide
 * @description
 * # sizeGuide
 */

angular.module('nightwalkerApp')
  .directive('siteSizeGuide', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/sizeguide.html'
    }
  })
