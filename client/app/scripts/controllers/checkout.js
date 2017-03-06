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

    $scope.goToShop = UserFactory.goToShop

    $scope.goToCheckout = UserFactory.goToCheckout

    $scope.updateCart = (add, newItem, replace) => {
      for (let item of $scope.items) {
        if (item.product.sku === newItem.product.sku) {
          add ? item.quantity += 1 : item.quantity -= 1

          if (replace || !item.quantity) {
            const index = $scope.items.indexOf(item)
            item.quantity = 0
            if (index > -1) {
              $scope.items.splice(index, 1)
            }
          }
          return UserFactory.updateCart(item.product.sku, item.quantity)
        }
      }
    }

    $scope.process = (status, response) => {
      if (status >= 400) {
        document.querySelector('.loading-container').classList.add('done-loading')
        document.querySelector('#payment-submit').disabled = false
        ModalService.showError({
          text: `We are sorry, ${response.error.message}`,
          footer: 'Please try with a different payment card'
        })
      } else {
        $http.post(base + '/checkout', {
          card: response.card,
          stripeToken: response.id,
          user: $scope.user,
          shippingDetails: $scope.shippingDetails
        }).then(response => {
          document.querySelector('.loading-container').classList.add('done-loading')
          UserFactory.setUser(response.data)
          $location.path('/congratulations')
        }, httpError => {
          document.querySelector('.loading-container').classList.add('done-loading')
          document.querySelector('#payment-submit').disabled = false
          ModalService.showError({
            text: `We are sorry, ${httpError.data.error.message}`
          })
        })
      }
    }
  })
