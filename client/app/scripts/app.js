/* global angular, Stripe */
'use strict'

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
    'ngTouch'
  ])
  .config(($routeProvider, $locationProvider, $httpProvider) => {
    $routeProvider
      .when('/', {
        template: '<site-gallery></site-gallery>'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/shop', {
        redirectTo: '/shop/alternating-current'
      })
      .when('/shop/:edition', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        resolve: {
          edition: ($route, ProductFactory) => {
            return ProductFactory.getEdition($route.current.params.edition)
          }
        }
      })
      .when('/shop/alternating-current/:flavor', {
        templateUrl: '/views/product.html',
        controller: 'ProductCtrl',
        resolve: {
          product: ($route, ProductFactory) => {
            return ProductFactory.getProduct($route.current.params.flavor)
          }
        }
      })
      .when('/login', {
        template: '<site-login></site-login>',
        controller: 'LoginCtrl'
      })
      .when('/create-account', {
        template: '<site-login></site-login>',
        controller: 'LoginCtrl'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/checkoutcart.html',
        controller: 'CheckoutCtrl',
        resolve: {
          items: (ProductFactory, UserFactory) => {
            return ProductFactory.getInfoFromSkus(UserFactory.currentUser.cart)
          }
        }
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
          items: (ProductFactory, UserFactory) => {
            return ProductFactory.getInfoFromSkus(UserFactory.currentUser.cart)
          }
        }
      })
      .when('/congratulations', {
        templateUrl: 'views/congratulations.html'
      })
      .otherwise({
        redirectTo: '/'
      })

    $httpProvider.interceptors.push('AuthInterceptorFactory')

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    })

    Stripe.setPublishableKey('pk_test_uEnw6EZC8otddMKeJUiZsHFz')
  })
  .run(($rootScope, $location) => {
    $rootScope.$on('$locationChangeStart', event => {
      // TODO: Remove Hack because nav does not exist yet
      const nav = document.querySelector('nav')
      if (nav) {
        if ($location.path() === '/') {
          nav.classList.remove('horizontal')
        } else {
          nav.classList.add('horizontal')
        }
      }
    })
    $rootScope.$on('$routeChangeError', (event, curRoute, prevRoute, rejection) => {
      $location.path(prevRoute.$$route.originalPath)
    })
  })
