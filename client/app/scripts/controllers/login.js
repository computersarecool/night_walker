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
    // If the user has a valid token, direct to account page
    if (UserFactory.checkToken()) {
      $location.path('/acccount')
    }
    // Do not show the login option if on signup route
    if ($location.path() === '/createaccount') {
      $scope.showLogin = false
    } else {
      $scope.showLogin = true
    }

    $scope.user = UserFactory.getUser()

    $scope.modalCart = false

    $scope.signup = function (email, password, firstName, lastName) {
      UserFactory.signup(email, password, firstName, lastName)
    }

    $scope.login = function (email, password) {
      UserFactory.login(email, password)
    }

    $scope.logout = function () {
      UserFactory.logout()
    }

    $scope.guestCheckout = function () {
      $location.path('/checkout')
    }

    $scope.changeScreen = function () {
      if ($location.path() === '/signup') {
        $location.path('/login')
      } else {
        $location.path('/signup')
      }
    }

    $scope.showModalCart = function () {
      $scope.modalCart = !$scope.modalCart
    }
    // This makes sure that the user is in sync with the user fetched from the DB
    $scope.$watch(function () {
      return UserFactory.currentUser
    }, function () {
      $scope.user = UserFactory.currentUser
    })
  })
