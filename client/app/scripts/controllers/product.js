'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ProductCtrl', function ($scope, $cookieStore, product) {
    $scope.product = product;
    $scope.addToCart = addToCart;

    function addToCart (id) {
      var cart = $cookieStore.get('cart');
      if (cart) {
        cart.push(id);
        $cookieStore.put('cart', cart);
      } else {
        $cookieStore.put('cart', [id]);
      }
    }

  });
