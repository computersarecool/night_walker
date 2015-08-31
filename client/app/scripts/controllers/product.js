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

    $scope.addToCart = function (productsku) {
      // Convert SKU to number because Angular templating does opposite
      var sku = parseInt(productsku, 10);
      if (UserFactory.currentUser.loggedIn) {
        UserFactory.addToCart(sku);
      } else {
        var store = $window.localStorage;
        var cart = JSON.parse(store.getItem('cart'));
        if (cart) {
          cart.push(item);
          store.setItem('cart', JSON.stringify(cart));
          $scope.user.cart = cart;
        } else {
          cart = [item];
          store.setItem('cart', JSON.stringify(cart));
          $scope.user.cart = cart;
        }
      }
    };
    
  });

