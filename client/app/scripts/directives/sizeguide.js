'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:sizeGuide
 * @description
 * # sizeGuide
 */

// TODO: When do controllers need to be set in angular?

angular.module('nightwalkerApp')
  .directive('siteSizeGuide', function () {
    return {
      restrict: 'E',      
      templateUrl: 'partials/sizeguide.html'
    };
  });

