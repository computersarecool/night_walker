/* global angular */
'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:modal
 * @description
 * # modalDirective
 */
angular.module('nightwalkerApp')
  .directive('siteModal', ModalService => {
    return {
      restrict: 'E',
      templateUrl: 'partials/modal.html',
      link: (scope, elem, attrs) => {
        function showInfo (message) {
          scope.message = message
        }

        function showError (message) {
          scope.message = message
          scope.showModal = true
        }

        ModalService.registerInfoCallback(showInfo)
        ModalService.registerErrorCallback(showError)
      }
    }
  })
