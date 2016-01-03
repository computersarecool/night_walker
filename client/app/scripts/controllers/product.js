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

    $scope.addToCart = function (productSKU) {
      // Convert SKU to number because Angular templating does opposite
      var sku = parseInt(productSKU, 10);
      var store = $window.localStorage;
      var cart = JSON.parse(store.getItem('cart'));

      if (UserFactory.currentUser.loggedIn) {
        // Add to cart in DB if user is logged in
        UserFactory.addToCart(sku);
      } else {
        // Add product to local cart if not logged in / no temp user
        if (cart) {
          cart.push(sku);
        } else {
          cart = [sku];
        }
        
        store.setItem('cart', JSON.stringify(cart));
        UserFactory.currentUser.cart = cart;
      }
    };

    $scope.toggleShow = function () {
      var details = document.querySelector('#details');
      var yOffset = $window.scrollY;
      details.style.top = yOffset + "px";
      
      if (details.className == 'visible') {
        details.className = '';
      } else {
        details.className = 'visible';
      };
    };

  });

