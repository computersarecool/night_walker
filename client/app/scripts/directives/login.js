'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:loginDirective
 * @description
 * # loginDirective
 */
angular.module('nightwalkerApp')
  .directive('siteLogin', function () {
    return {
      templateUrl: 'partials/login.html', 
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.login = function () {
            console.log('Someone has logged in');
        };
        
      }
    };
  });
