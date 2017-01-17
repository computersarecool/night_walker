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

    $scope.createAccount = (email, password, firstName, lastName) => UserFactory.createAccount(email, password, firstName, lastName)

    $scope.login = (email, password) => UserFactory.login(email, password)

    $scope.logout = () => UserFactory.logout()

    $scope.guestCheckout = () => $location.path('/checkout')

    $scope.showModalCart = () => {
      $scope.modalCart = !$scope.modalCart
    }

    // TODO: Is this neccesary?
    // This makes sure that the user is in sync with the user fetched from the DB
    $scope.$watch(() => {
      return UserFactory.currentUser
    }, () => {
      $scope.user = UserFactory.currentUser
    })
  })
