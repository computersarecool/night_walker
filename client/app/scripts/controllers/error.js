'use strict'

/**
 * @ngdoc service
 * @name nightwalkerApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the nightwalkerApp.
 */

angular.module('nightwalkerApp')
  .controller('ErrorCtrl', function ($scope) {
    $scope.showModal = false

    $scope.hideModal = () => {
      $scope.showModal = false
    }

    const info = document.querySelector('#modal.modal-info')
    const footer = document.querySelector('#modal.modal-footer')
    const defaultFooter = 'Please contact help@example.com'

    function displayError (err, optionalInfo) {
      if (optionalInfo) {
        info.textContent = optionalInfo
        footer.textContent = defaultFooter
      } else if (err.status >= 500) {
        info.textContent = 'We are sorry but our services are currently unavailable'
        footer.textContent = 'Please check back soon'
      } else {
        info.textContent = err.message
        info.textContent = 'Please examine your request or contact help@example.com'
      }
      $scope.showModal = true
    }

    return {
      displayError
    }

  })
