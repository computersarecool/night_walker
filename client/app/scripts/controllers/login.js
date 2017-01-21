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

    $scope.user = UserFactory.user

    $scope.showLogin = $location.path() === '/login'

    $scope.changeScreen = () => $location.path() === '/login' ? $location.path('/create-account') : $location.path('/login')

    $scope.submitUserDetails = (route, email, password, firstName = null, lastName = null) => UserFactory.submitUserDetails('/authenticate/' + route, email, password, firstName, lastName)

    $scope.logout = () => UserFactory.logout()

    $scope.guestCheckout = () => $location.path('/checkout')

    $scope.showModalCart = () => {
      $scope.modalCart = !$scope.modalCart
    }

    $scope.notHome = () => {
      return $location.path() !== '/'
    }

    $scope.$watch(() => {
      return UserFactory.currentUser
    }, () => {
      console.log('a')
      $scope.user = UserFactory.currentUser
    })
  })
