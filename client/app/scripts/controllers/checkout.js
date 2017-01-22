'use strict'

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CheckoutCtrl', function ($scope, $window, $location, $http, items, UserFactory, ModalService, base) {
    $scope.items = items

    $scope.goToCheckout = UserFactory.goToCheckout

    $scope.user = UserFactory.getUser().then(results => {
      $scope.user = results
    }, httpError => {
      $scope.user = UserFactory.getUser
    })

    $scope.$on('user:updated', (event, data) => {
      $scope.user = data
    })

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
        ModalService.showError({
          text: `We are sorry we, ${response.error.message}`
        })
      } else {
        $http.post(base + '/checkout', {
          card: response.card,
          stripeToken: response.id,
          user: $scope.user,
          shippingDetails: $scope.shippingDetails
        }).then(response => {
          UserFactory.setUser(response.data)
          $location.path('/congratulations')
        }, httpError => {
          ModalService.showError({
            text: 'There was an error with your purchase.',
            footer: 'Please contact support'
          })
        })
      }
    }
  })
