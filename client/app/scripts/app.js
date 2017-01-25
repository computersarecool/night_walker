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
  .constant('base', 'http://35.164.160.104:3000')
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
      .when('/create-account', {
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        resolve: {
          check: ($location, UserFactory, ModalService) => {
            if (!UserFactory.checkToken()) {
              $location.path('/login')
              ModalService.showError({
                text: 'Please login'
              })
            }
          }
        }
      })
      .when('/reset-password', {
        templateUrl: 'views/reset_password.html',
        controller: 'LoginCtrl'
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
          user: UserFactory => UserFactory.getUser(),
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
    $rootScope.$on('$routeChangeError', (event, curRoute, prevRoute, rejection) => {
      $location.path(prevRoute.$$route.originalPath)
    })
  })
