'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('nightwalkerApp')
  .directive('siteNav', function ($location) {
    return {
      restrict: 'E',
      templateUrl: 'partials/navigation.html',
      link: function (scope, element) {
        scope.toggleNav = function (e) {
          if (e.target !== e.currentTarget) {
            if ($location.path() === '/') {
              e.currentTarget.className = 'horizontal';
            }
          }
          // TODO: Figure out why e.stopPropgation here causes problems
        };
      }
    };
  });

