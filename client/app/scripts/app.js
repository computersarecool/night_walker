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
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
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
        redirectTo: '/shop/alternatingcurrent'
      })
      .when('/shop/:collection', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        resolve: {
          collection: function ($route, productService) {
            return productService.getCollection($route.current.params.collection);
          }
        }
      })
      .when('/shop/alternatingcurrent/:flavor', {
        templateUrl:'/views/product.html',
        controller: 'ProductCtrl',
        resolve: {
          product: function ($route, productService) {
            return productService.getProduct($route.current.params.flavor);
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
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

    Stripe.setPublishableKey('pk_test_uEnw6EZC8otddMKeJUiZsHFz');


    $locationProvider.html5Mode({
      enabled: true, 
      requireBase: true
    });

    
  });
