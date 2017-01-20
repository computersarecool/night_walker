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

    $scope.showLogin = $location.path() === '/login'

    $scope.changeScreen = () => $location.path() === '/login' ? $location.path('/create-account') : $location.path('/login')

    $scope.submitUserDetails = (route, email, password, firstName = null, lastName = null) => UserFactory.submitUserDetails('authenticate/' + route, email, password, firstName, lastName)

    $scope.logout = () => UserFactory.logout()

    $scope.guestCheckout = () => $location.path('/checkout')

    $scope.showModalCart = () => {
      $scope.modalCart = !$scope.modalCart
    }

    // This makes sure that the user is in sync with the user fetched from the DB
    $scope.$watch(() => {
      return UserFactory.currentUser
    }, () => {
      $scope.user = UserFactory.currentUser
    })
  })
