'use strict';

/**
 * @ngdoc overview
 * @name nightwalkerApp
 * @description
 * # nightwalkerApp
 *
 * Main module of the application.
 */
angular
  .module('nightwalkerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/gallery.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })      
      .when('/shop', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        resolve: {
          products: function (productService) {
            return productService.getProducts();
          }
        }
      })
      .when('/product/:flavor', {
        templateUrl:'/views/product.html',
        controller: 'ProductCtrl',
        resolve: {
          product: function (productService, $route) {
            return productService.getIndividual($route.current.params.flavor);
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })


      .otherwise({
        redirectTo: '/'
      });



    $locationProvider.html5Mode({
      enabled: true, 
      requireBase: true
    })


    
  });
