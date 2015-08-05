'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ProductCtrl', function ($scope, $window, UserFactory, product) {
    $scope.product = product;
    $scope.addToCart = function (item) {
      // Convert SKU to number because Angular templating does opposite
      item = parseInt(item, 10);
      if (UserFactory.currentUser) {
        UserFactory.addToCart(item);
      } else {
        var store = $window.localStorage;
        var cart = JSON.parse(store.getItem('cart'));
        if (cart) {
          cart.push(item);
          store.setItem('cart', JSON.stringify(cart));
        } else {
          cart = JSON.stringify([item]);
          store.setItem('cart', cart);
        }
      }
    };

  });

