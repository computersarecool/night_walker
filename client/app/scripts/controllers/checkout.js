'use strict'

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CheckoutCtrl', function ($scope, $window, $location, $http, items, UserFactory, base) {
    $scope.items = items
    $scope.user = UserFactory.getUser()
    $scope.goToCheckout = UserFactory.goToCheckout

    $scope.removeItem = item => {
      item.quantity = 0
      $scope.updateCart(item)
    }

    $scope.updateCart = item => {
      for (let i = 0; i < $scope.items.length; i++) {
        if ($scope.items[i].product.sku === item.product.sku) {
          let itemIndex = i
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

    $scope.process = (status, response) => {
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
