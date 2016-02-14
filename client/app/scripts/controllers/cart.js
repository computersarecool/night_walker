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

    $scope.removeItem = function (item) {
      item.quantity = 0;
      $scope.updateCart(item);
    };

    $scope.updateCart = function (item) {
      for (var i = 0; i < $scope.items.length; i++) {
        if ($scope.items[i].product.sku === item.product.sku) {
          var itemIndex = i;
          if (item.quantity) {
            $scope.items[i] = item;            
          } else {
            $scope.items.splice(itemIndex, 1);
          }
          break;
        }
      }

      UserFactory.updateCart(item.product.sku, item.quantity);
    };

  });

