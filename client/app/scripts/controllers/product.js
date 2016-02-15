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


    var xNow;
    var xDelta;
    var xOffset;
    var xPrevious;
    
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
    
    $scope.pickedProduct = {
      size: product.distinctSizes[0],
      sku: "1" + flavorIndex + product.distinctSizes[0].waistSize + product.distinctSizes[0].inseam,
    };

    $scope.dragging = false;
    
    $scope.startScroll = function (e) {
      xPrevious = e.touches[0].screenX;
      $scope.dragging = true;
    };

    $scope.stopScroll = function () {
      $scope.dragging = false;
      xPrevious = undefined;
    };

    $scope.scrollGallery = function (e) {
      var newPosition;
      if ($scope.dragging) {
        xNow = e.touches[0].screenX;        
        xDelta = xNow - xPrevious;
        xOffset = xDelta + parseInt(holder.style.left);

        if (isNaN(xOffset)) {
          holder.style.left = '0px';          
          return;
        }
        
        if (xOffset <= -730 && xDelta <= 0 || xOffset >= 0 && xDelta >= 0) {
          return;
        }

        newPosition = xOffset + xDelta;
        holder.style.left = newPosition + 'px';
        xPrevious = xNow;
        
        switch(true) {
          case newPosition > -20:
            document.querySelector('#front-view').checked = true;
            break;
          case (newPosition > -40 && newPosition <= -20):
            document.querySelector('#side-view').checked = true;
            break;
          case (newPosition > -60 && newPosition <= -40):
            document.querySelector('#detail-view').checked = true;
            break;
          case (newPosition > -80 && newPosition <= -60):
            document.querySelector('#back-view').checked = true;          
            break;            
        }
      }
    };

    $scope.scrollTo = function (pictureName) {
      switch(pictureName) {
        case 'front-view':
          holder.style.left = '0px';
          break;
        case 'side-view':
          holder.style.left = '30px';
          break;
        case 'detail-view':
          holder.style.left = '70px';        
          break;
        case 'back-view':
          holder.style.left = '120px';                
          break;
      }
    };
    
    $scope.toggleShow = function (id) {
      var element = document.querySelector(id);
      var yOffset = $window.scrollY;
      element.style.top = yOffset + "px";
      element.classList.toggle('hidden');
    };
    
    $scope.changeSize = function () {
      $scope.pickedProduct.sku = "1" + flavorIndex + $scope.pickedProduct.size.waistSize + $scope.pickedProduct.size.inseam;
    };
    
    $scope.addToCart = function () {
      // Convert SKU to number because Angular templating does opposite
      var sku = parseInt($scope.pickedProduct.sku, 10);
      var store = $window.localStorage;
      var cart = angular.fromJson(store.getItem('cart'));
            
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

  });

