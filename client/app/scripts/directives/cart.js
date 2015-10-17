'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:cartDirective
 * @description
 * # cartDirective
 */
angular.module('nightwalkerApp')
  .directive('cartDirective', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the cartDirective directive');
      }
    };
  });
