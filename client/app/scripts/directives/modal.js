'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:modal
 * @description
 * # modalDirective
 */
angular.module('nightwalkerApp')
  .directive('siteModal', () => {
    return {
      restrict: 'E',
      templateUrl: 'partials/modal.html',
      controller: 'ErrorCtrl'
    }
  })
