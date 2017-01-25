/* global angular */
'use strict'

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nightwalkerApp
 */

angular.module('nightwalkerApp')
  .controller('LoginCtrl', function ($scope, $window, $location, UserFactory) {
    $scope.modalCart = false

    $scope.resetInProgress = false

    $scope.user = UserFactory.getUser().then(results => {
      $scope.user = results
    }, httpError => {
      $scope.user = UserFactory.getUser
    })

    $scope.$on('user:updated', (event, data) => {
      $scope.user = data
    })

    $scope.showLogin = $location.path() === '/login'

    $scope.changeScreen = () => $location.path() === '/login' ? $location.path('/create-account') : $location.path('/login')

    $scope.submitUserDetails = (route, email, password, firstName = null, lastName = null) => UserFactory.submitUserDetails('/authenticate/' + route, email, password, firstName, lastName)

    $scope.logout = () => UserFactory.logout()

    $scope.guestCheckout = () => $location.path('/checkout')

    $scope.showModalCart = () => {
      $scope.modalCart = !$scope.modalCart
    }

    $scope.forgotRedirect = () => $location.path('/reset-password')

    $scope.resetPassword = email => {
      UserFactory.resetPassword(email).then(success => {
        $scope.resetInProgress = true
      })
    }

    $scope.updatePassword = (email, resetCode, newPassword) => {
      UserFactory.updatePassword(email, resetCode, newPassword).then(success => {
        $scope.resetInProgress = false
        $location.path('/login')
      })
    }

    $scope.notHome = () => {
      return $location.path() !== '/'
    }
  })
