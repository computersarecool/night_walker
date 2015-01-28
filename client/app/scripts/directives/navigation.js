'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('nightwalkerApp')
  .directive('siteNav', function () {
    return {
      templateUrl: 'partials/navigation.html',
      restrict: 'E',
/*      link: function postLink(scope, element, attrs) {
        element.text('this is the navigation directive');
      }*/
    };
  });
