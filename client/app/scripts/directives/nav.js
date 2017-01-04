'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('nightwalkerApp')
  .directive('siteNav', function ($window, $location, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'partials/nav.html',
      link: function (scope, element) {
        scope.toggleNav = function (e) {
          // Check to see if the clicked item is any nav list element
          if (e.target !== e.currentTarget) {
            if ($location.path() === '/') {

              /* TODO: Uncomment to animate the nav going horizontal
                            e.currentTarget.className = 'collapsed'

                            $timeout(function (navUl) {
                              navUl.className = 'height-collapse'

                              // TODO: Figure out why there can't be two $timeouts
                              $window.setTimeout(function (navUl) {
                                navUl.className = 'horizontal'
                              }, 200, navUl)
                              
                            }, 200, true, e.currentTarget)
               */

              e.currentTarget.className = 'horizontal'
            }
          }
        // TODO: Figure out why e.stopPropgation here causes problems
        }
      }
    }
  })
