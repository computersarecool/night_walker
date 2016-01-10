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
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
      })      
      .when('/shop', {
        redirectTo: '/shop/alternating-current',
      })
      .when('/shop/:collection', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        resolve: {
          collection: function ($route, ProductFactory) {
            return ProductFactory.getCollection($route.current.params.collection);
          },
        },
      })
      .when('/shop/alternating-current/:flavor', {
        templateUrl:'/views/product.html',
        controller: 'ProductCtrl',
        resolve: {
          product: function ($route, ProductFactory) {
            return ProductFactory.getProduct($route.current.params.flavor);
          },
        },
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
      .when('/signup', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })      
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl',
      })
      .when('/congratulations', {
        templateUrl: 'views/congratulations.html',
        controller: 'CongratulationsCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });


    
    $httpProvider.interceptors.push('AuthInterceptorFactory');

    Stripe.setPublishableKey('pk_test_uEnw6EZC8otddMKeJUiZsHFz');

    $locationProvider.html5Mode({
      enabled: true, 
      requireBase: true
    });
    
  });
