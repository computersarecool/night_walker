'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:header
 * @description
 * # header
 */
angular.module('nightwalkerApp')
  .directive('siteHeader', function () {
    return {
      templateUrl: 'partials/header.html',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the header directive');
      // }
    };
  });
