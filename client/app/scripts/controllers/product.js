'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ProductCtrl', function ($scope, $cookieStore, UserFactory, product) {
    $scope.product = product;
    $scope.addToCart = function (item) {
      // Convert SKU to number because Angular templating does opposite
      item = parseInt(item, 10);
      if (UserFactory.currentUser) {
        UserFactory.addToCart(item);
      } else {
        var cart = $cookieStore.get('cart');
        if (cart) {
          cart.push(item);
          $cookieStore.put('cart', cart);
        } else {
           cart = [item];
          $cookieStore.put('cart', cart);
        }
      }
    };

  });
