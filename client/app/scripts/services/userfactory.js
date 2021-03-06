/* global angular */
'use strict'

/**
 * @ngdoc service
 * @name nightwalkerApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('UserFactory', function ($rootScope, $window, $http, $location, $q, AuthTokenFactory, ModalService, base) {
    let user = {}
    const store = $window.localStorage

    const guestUser = {
      cart: []
    }

    function checkToken () {
      return AuthTokenFactory.getToken()
    }

    function resolveAndSet (q, returnedUser) {
      q.resolve(returnedUser)
      user.currentUser = returnedUser
      if (!checkToken()) {
        store.setItem('user', angular.toJson(returnedUser))
      }
      $rootScope.$broadcast('user:updated', returnedUser)
    }

    function setUser (newUser) {
      user.currentUser = newUser
      if (!checkToken()) {
        store.setItem('user', angular.toJson(newUser))
      }
      $rootScope.$broadcast('user:updated', newUser)
    }

    function clearCart () {
      user.currentUser.cart = []
      if (checkToken()) {
        $http.post(base + '/product', {
          items: [],
          replace: true
        }).then(() => $rootScope.$broadcast('user:updated', user.currentUser))
      } else {
        store.setItem('user', angular.toJson(user.currentUser))
      }
    }

    function getUser () {
      const deferred = $q.defer()
      if (checkToken()) {
        $http.get(base + '/user')
          .then(response => {
            resolveAndSet(deferred, response.data)
          }, httpError => {
            if (httpError.status === 401) {
              // Remove key and clear user because key was invalid
              AuthTokenFactory.setToken()
              resolveAndSet(deferred, guestUser)
            } else {
              resolveAndSet(deferred, guestUser)
            }
          })
      // There is a user object in storage, validate the user
      } else if (store.getItem('user')) {
        try {
          const returnedUser = angular.fromJson(store.getItem('user'))
          if (Array.isArray(returnedUser.cart)) {
            resolveAndSet(deferred, returnedUser)
          } else {
            throw new Error('Invalid user')
          }
        } catch (e) {
          resolveAndSet(deferred, guestUser)
        }
      // No auth-token and no user in storage, set to default
      } else {
        resolveAndSet(deferred, guestUser)
      }
      return deferred.promise
    }

    function handleWrongCreds (httpError) {
      if (httpError.status === 401) {
        ModalService.showError({
          text: `We are sorry, ${httpError.data.error.message}`
        })
      } else {
        ModalService.showError({
          text: 'There was an error retreiving your request',
          footer: 'Please contact support'
        })
      }
    }

    function successLogin (response) {
      AuthTokenFactory.setToken(response.data.token)
      setUser(response.data.user)
      store.removeItem('user')
      $location.path('/account')
    }

    function submitUserDetails (route, email, password, firstName, lastName) {
      const user = angular.fromJson(store.getItem('user'))
      return $http.post(base + route, {
        email,
        password,
        firstName,
        lastName,
        user
      }).then(successLogin, handleWrongCreds)
    }

    function logout () {
      AuthTokenFactory.setToken()
      store.removeItem('user')
      setUser(guestUser)
      $location.path('/')
    }

    function resetPassword (email) {
      const deferred = $q.defer()
      $http.post(base + '/reset-password/reset', {email})
      .then(response => {
        deferred.resolve()
      }, httpError => {
        if (httpError.status === 401) {
          ModalService.showError({
            text: 'We could not find an account with that email.',
            footer: 'Please try again'
          })
        } else {
          ModalService.showError({
            text: 'There was an error resetting your password',
            footer: 'Please contact support'
          })
        }
      })
      return deferred.promise
    }

    function updatePassword (email, resetCode, newPassword) {
      const deferred = $q.defer()
      $http.post(base + '/reset-password/update', {
        email,
        resetCode,
        newPassword
      })
      .then(response => {
        deferred.resolve()
      }, httpError => {
        if (httpError.status === 401) {
          ModalService.showError({
            text: 'We could not find an account with that email.',
            footer: 'Please try again'
          })
        } else {
          ModalService.showError({
            text: 'There was an error updating your password',
            footer: 'Please contact support'
          })
        }
      })
      return deferred.promise
    }

    function addToCart (item) {
      if (checkToken()) {
        return $http.post(base + '/addproduct', {
          items: [item],
          replace: false
        })
        .then(response => {
          setUser(response.data)
        }, httpError => {
          if (httpError.status === 401) {
            // Remove key and clear user because key was invalid
            AuthTokenFactory.setToken()
            getUser()
          } else {
            ModalService.showError({
              text: 'There was an error adding your item',
              footer: 'Please contact support'
            })
          }
        })
      } else {
        let activeUser
        try {
          activeUser = angular.fromJson(store.getItem('user'))
        } catch (e) {
          activeUser = guestUser
        }
        activeUser.cart.push(item)
        store.setItem('user', angular.toJson(activeUser))
        setUser(activeUser)
      }
    }

    function updateCart (itemSku, quantity) {
      const selectCart = user.currentUser.cart.filter(oldItemSku => {
        return oldItemSku !== itemSku
      })

      for (let i = 0; i < quantity; i++) {
        selectCart.push(itemSku)
      }

      user.currentUser.cart = selectCart
      setUser(user.currentUser)

      if (checkToken()) {
        return $http.post(base + '/addproduct', {
          items: selectCart,
          replace: true
        })
      }
      store.setItem('user', angular.toJson(user.currentUser))
    }

    function goToCheckout () {
      $location.path('/checkout')
    }

    function goToCart () {
      $location.path('/cart')
    }

    function goToShop () {
      $location.path('/shop')
    }

    const currentUser = getUser()

    user = {
      guestUser,
      currentUser,
      getUser,
      setUser,
      clearCart,
      checkToken,
      submitUserDetails,
      logout,
      resetPassword,
      updatePassword,
      addToCart,
      updateCart,
      goToCheckout,
      goToCart,
      goToShop
    }

    return user
  })
