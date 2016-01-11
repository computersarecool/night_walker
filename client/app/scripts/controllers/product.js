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

    var dragging;
    var xStart;
    var yStart;
    var xNow;
    var yNow;
    var xDelta;
    
    var xOffset = 0;    
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

    $scope.startScroll = function (e) {
      console.log('hihihh');
//      xStart = e.touches[0].screenX;
//      yStart = e.touches[0].screenY;
//      xDelta = xStart;
      dragging = true;
    };

    $scope.stopScroll = function () {
      dragging = false;
    };

    $scope.scrollGallery = function (e) {
      if (dragging) {
        console.log('hi');
        xNow = e.touches[0].screenX;
        yNow = e.touches[0].screenY;
        xOffset += (xDelta -= xNow);
        //        holder.style.left = xOffset + "px";
        holder.style.left = "555px";
        console.log('hi');
      }
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

