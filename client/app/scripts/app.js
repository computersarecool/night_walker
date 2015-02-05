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
    'ngTouch',
    'angular-stripe'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider, stripeProvider) {
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
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('AuthInterceptorFactory');

    $locationProvider.html5Mode({
      enabled: true, 
      requireBase: true
    });

    stripeProvider.setPublishableKey('pk_test_uEnw6EZC8otddMKeJUiZsHFz');
    
  });
