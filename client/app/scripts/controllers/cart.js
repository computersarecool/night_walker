'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CartCtrl', function ($scope, items, UserFactory) {

    $scope.items = items;

    $scope.updateCart = function (item, removeFromCart) {
      if (removeFromCart) {
        // Delete item from cart
        UserFactory.updateCart(item.product.sku, 0);
      } else {
        // Change amount quantity
        // Make return new $scope.items
        UserFactory.updateCart(item.product.sku, item.quantity);
      }
    };

  });

