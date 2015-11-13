'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('nightwalkerApp')
  .directive('siteNav', function ($location, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'partials/navigation.html',
      link: function (scope, element) {
        scope.toggleNav = function (e) {
          if (e.target !== e.currentTarget) {
            if ($location.path() === '/') {
              e.currentTarget.className = 'collapsed';
              var thing = e.currentTarget;
              $timeout(function (navUl) {
                navUl.className = 'horizontal';
              }, 2000, true, e.currentTarget);
            }
          }
          // TODO: Figure out why e.stopPropgation here causes problems
        };
      }
    };
  });

