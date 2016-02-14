'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('UserFactory', function ($window, $http, $location, AuthTokenFactory) {

    var user = {};
    
    var store = $window.localStorage;
    var cart = angular.fromJson(store.cart);
    
    function checkToken () {
      return AuthTokenFactory.getToken();
    }
    
    function signup (email, password, firstName, lastName) {
      return $http.post('/api/login/signup', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        cart: store.getItem('cart')
      }).then(function success (response) {
        AuthTokenFactory.setToken(response.data.token);
        user.currentUser = response.data.user;
        store.removeItem('cart');
        $location.path('/account');
      }, function error (response) {
        // TODO: Better error handling
        if (response.status == 401) {
          alert('Some information you entered is invalid');
        }
        // Unknown error
        return undefined;
      });
    }
    
    function login (email, password) {
      return $http.post('/api/login/login', {
        email: email,
        password: password,
        cart: store.getItem('cart')        
      }).then(function success (response) {
        AuthTokenFactory.setToken(response.data.token);
        user.currentUser = response.data.user;
        store.removeItem('cart');        
        $location.path('/account');
      }, function error (response) {
        // TODO: Better error handling
        if (response.status == 401) {
          alert('Some information you entered is invalid');
        }
        // Unknown error
        return undefined;
      });
    }
    
    function logout () {
      AuthTokenFactory.setToken();
      user.currentUser = {
        loggedIn: false,
      };
      $location.path('/');
    }
    
    function addToCart (items) {
      if (user.currentUser.loggedIn) {
        // Add to DB cart and remove from localStorage if logged in
        return $http.post('/api/addproduct', {
          items: items
        }).then(function success (response) {
          user.currentUser = response.data;
          store.removeItem('cart');        
        }, function error (response) {
          // TODO: Better error handling
          alert('There was an error with your request');
          return undefined;
        });
      } else if (!user.currentUser) {
        // Add to temporary user cart and storage if there is no user
        var cart = angular.fromJson(store.getItem('cart'));

        if (cart) {
          cart.push(items);
        } else {
          cart = [items];
        }
        store.setItem('cart', angular.toJson(cart));
        user.currentUser = {
          'cart': cart,
        };
      } else {
        // Add to temporary user cart if this is non-logged in user
        user.currentUser.cart = cart;
      }
      return undefined;
    }

    
    function updateCart (itemSku, quantity) {
      //TODO: Check with database to make sure the amount is available
      var selectCart = user.currentUser.cart.filter(function (oldItemSku) {
        return oldItemSku !== itemSku;
      });

      for (var i = 0; i < quantity; i++) {
        selectCart.push(itemSku);
      }
      
      user.currentUser.cart = selectCart;
      
      if (!user.currentUser.loggedIn) {
        store.setItem('cart', angular.toJson(user.currentUser.cart));
      }
    }

    
    function getUser () {
      if (AuthTokenFactory.getToken()) {
        return $http.get('/api/user')
          .then (function success (response) {
            user.currentUser = response.data.user;
          }, function (httpError) {
            // TODO: Better error handling
            // There is an auth token but no associated user
            throw httpError.status + " : " + httpError.data;
            return undefined;
         });
       } else {
         user.currentUser = {
           loggedIn: false,
           cart: cart
         };
         return undefined;
       }
     }

    
    user = {
      addToCart: addToCart,
      updateCart: updateCart,
      login: login,
      logout: logout,
      signup: signup,
      checkToken: checkToken,
      getUser: getUser,
      currentUser: getUser()
    };

    return user;

  });

