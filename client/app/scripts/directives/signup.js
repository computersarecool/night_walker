'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:loginDirective
 * @description
 * # loginDirective
 */
angular.module('nightwalkerApp')
  .directive('siteSignup', function () {
    return {
      templateUrl: 'partials/signup.html', 
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.login = function () {
            console.log('Someone has logged in');
        };
        
      }
    };
  });
