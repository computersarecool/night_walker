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
    // Do not show the login option if on signup route
    if ($location.path() === '/create-account') {
      $scope.showLogin = false
    } else {
      $scope.showLogin = true
    }

    $scope.modalCart = false

    $scope.signup = (email, password, firstName, lastName) => {
      UserFactory.signup(email, password, firstName, lastName)
    }

    $scope.login = (email, password) => {
      UserFactory.login(email, password)
    }

    $scope.logout = () => {
      UserFactory.logout()
    }

    $scope.guestCheckout = () => {
      $location.path('/checkout')
    }

    $scope.changeScreen = () => {
      if ($location.path() === '/signup') {
        $location.path('/login')
      } else {
        $location.path('/signup')
      }
    }

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
