'use strict'

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CheckoutCtrl', function ($scope, $window, $location, $http, items, UserFactory) {
    var base = 'http://api.optonox.com:3000'

    $scope.items = items
    $scope.user = UserFactory.currentUser
    $scope.goToCheckout = UserFactory.goToCheckout

    $scope.removeItem = function (item) {
      item.quantity = 0
      $scope.updateCart(item)
    }

    $scope.updateCart = function (item) {
      for (var i = 0; i < $scope.items.length; i++) {
        if ($scope.items[i].product.sku === item.product.sku) {
          var itemIndex = i
          if (item.quantity) {
            $scope.items[i] = item
          } else {
            $scope.items.splice(itemIndex, 1)
          }
          break
        }
      }
      UserFactory.updateCart(item.product.sku, item.quantity)
    }

    $scope.process = function (status, response) {
      if (response.error) {
        // TODO: Do something meaningful with validation error from stripe
        // needs to go to server
        alert(response.error.message)
      } else {
        $http.post(base + '/checkout', {
          card: response.card,
          stripeToken: response.id,
          user: UserFactory.currentUser,
          shippingDetails: $scope.shippingDetails
        }).then(function success (response) {
          UserFactory.currentUser = response.data
          // Only needed if user is checking out as guest, but do anyway
          $window.localStorage.removeItem('cart')
          $location.path('/congratulations')
        }, function error (response) {
          // TODO: Do something meaningful with error from API
//          alert(response.data.error.message)
        })
      }
    }
  })
