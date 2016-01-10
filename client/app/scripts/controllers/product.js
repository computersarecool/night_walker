'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ProductCtrl', function ($scope, $window, $location, UserFactory, product) {

    var sizeGuide = document.querySelector('#sizemenu');
    var holder = document.querySelector('#gallery-holder');
    
    var flavorIndex;
    var flavorTest = product['urlFlavor'];

    if (flavorTest === 'cherry') {
      flavorIndex = "1";
    } else {
      flavorIndex = "2";      
    }

    $scope.product = product;
    
    $scope.scrollSnap = function () {
      console.log('hi');
    };

    $scope.test = function () {
      console.log('yesd');
    };
    
    $scope.addToCart = function (productSKU) {
      // Convert SKU to number because Angular templating does opposite
      var sku = parseInt(productSKU, 10);
      var store = $window.localStorage;
      var cart = JSON.parse(store.getItem('cart'));

      $scope.pickedProduct = {};
            
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
      document.querySelector('#checkout-now').classList.remove('hidden');
    };

    $scope.goToCheckout = function () {
      $location.path('/checkout');
    };
    
    $scope.toggleShow = function (id) {
      var element = document.querySelector(id);
      var yOffset = $window.scrollY;
      element.style.top = yOffset + "px";
      element.classList.toggle('hidden');
    };

    $scope.changeSize = function () {
      $scope.product.sku = Number("1" + flavorIndex + sizeGuide.options[sizeGuide.selectedIndex].value);
    };
    
  });

