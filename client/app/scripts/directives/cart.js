'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:cartDirective
 * @description
 * # cartDirective
 */
angular.module('nightwalkerApp')
  .directive('siteCart', function (UserFactory) {
    return {
      restrict: 'E',
      replace: true,
      link: function (scope, element, attrs) {
        scope.show = true;
        scope.toggleView = function () {
          scope.show = !scope.show;
          console.log(scope.show);
        };
      },
      templateUrl: 'partials/cart.html'
    };
  });

