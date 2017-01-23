3/* global angular */
'use strict'

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the nightwalkerApp
 */

angular.module('nightwalkerApp')
  .controller('CheckoutCtrl', function ($scope, $window, $location, $http, UserFactory, ModalService, base, user, items) {
    $scope.user = user

    $scope.items = items

    $scope.$on('user:updated', (event, data) => {
      $scope.user = data
    })

    $scope.goToCheckout = UserFactory.goToCheckout

    $scope.updateCart = (add, item, replace) => {
      for (let i = 0; i < $scope.items.length; i++) {
        if ($scope.items[i].product.sku === item.product.sku) {
          if (add) {
            $scope.items[i].quantity += 1
          } else {
            $scope.items[i].quantity -= 1
          }
          if (replace || !$scope.items[i].quantity) {
            $scope.items[i].quantity = 0
            $scope.items.splice(i, 1)
          }
        }
        return UserFactory.updateCart(item.product.sku, item.quantity)
      }
    }

    $scope.process = (status, response) => {
      if (response.error) {
        ModalService.showError({
          text: `We are sorry we, ${response.error.message}`,
          footer: 'Please try with a different payment card'
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
          document.querySelector('payment-submit').disabled = false
          ModalService.showError({
            text: 'There was an error with your purchase.',
            footer: 'Please contact support'
          })
        })
      }
    }
  })
