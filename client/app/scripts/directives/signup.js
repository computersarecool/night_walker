'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:loginDirective
 * @description
 * # loginDirective
 */
angular.module('nightwalkerApp')
  .directive('siteSignup', function (UserFactory) {
    return {
      templateUrl: 'partials/signup.html', 
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.signup = function (username, password) {
            UserFactory.signup(username, password);
        };
        
      }
    };
  });
