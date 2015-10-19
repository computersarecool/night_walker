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
      restrict: 'E',
      templateUrl: 'partials/login.html', 
      controller: 'LoginCtrl'        
    };
  });
