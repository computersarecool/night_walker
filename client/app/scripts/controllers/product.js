/* global angular */
'use strict'

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ProductCtrl', function ($scope, $window, $location, UserFactory, product) {
    let xNow
    let xPrevious
    let xDelta
    let xOffset
    let holder = document.querySelector('#gallery-holder')
    const numberOfImages = 4

    $scope.product = product

    $scope.pickedProduct = {
      size: product.distinctSizes[0],
      sku: '1' + $scope.product.flavorIndex + $scope.product.distinctSizes[0].waistSize + $scope.product.distinctSizes[0].inseam
    }

    $scope.changeSize = () => {
      $scope.pickedProduct.sku = '1' + $scope.product.flavorIndex + $scope.pickedProduct.size.waistSize + $scope.pickedProduct.size.inseam
    }

    $scope.goToCheckout = UserFactory.goToCheckout

    $scope.startScroll = e => {
      xPrevious = e.touches[0].screenX
    }

    $scope.scrollGallery = e => {
      const pictureWidth = document.querySelector('img.individual-main').offsetWidth
      const maxXoffset = -pictureWidth * (numberOfImages - 1)
      xNow = e.touches[0].screenX
      xDelta = xNow - xPrevious
      xOffset = xDelta + parseInt(holder.style.left)

      // Set the offset on the element because it is initially undefined
      if (isNaN(xOffset)) {
        holder.style.left = '0px'
        return
      }

      // Element is out of scroll bounds and user is still trying to scroll
      if (xOffset <= maxXoffset && xDelta <= 0 || xOffset >= 0 && xDelta >= 0) {
        return
      }

      let newPosition = xOffset + xDelta
      holder.style.left = newPosition + 'px'
      xPrevious = xNow

      if (newPosition > -pictureWidth / 2) {
        document.querySelector('#front-view').checked = true
      } else if (newPosition <= -pictureWidth / 2 && newPosition > -pictureWidth * 4 / 3) {
        document.querySelector('#side-view').checked = true
      } else if (newPosition <= -pictureWidth * 4 / 3 && newPosition > -pictureWidth * 8 / 3) {
        document.querySelector('#detail-view').checked = true
      } else {
        document.querySelector('#back-view').checked = true
      }
    }

    $scope.scrollTo = pictureName => {
      const pictureWidth = document.querySelector('img.individual-main').offsetWidth

      if (pictureName === 'front-view') {
        holder.style.left = '0px'
      } else if (pictureName === 'side-view') {
        holder.style.left = -pictureWidth + 'px'
      } else if (pictureName === 'detail-view') {
        holder.style.left = -pictureWidth * 2 + 'px'
      } else {
        holder.style.left = -pictureWidth * 3 + 'px'
      }
    }

    $scope.toggleShow = selector => {
      const element = document.querySelector(selector)
      const headerHeight = document.querySelector('site-header').scrollHeight
      const navHeight = document.querySelector('site-nav').scrollHeight
      const yOffset = $window.scrollY
      const difference = yOffset - headerHeight - navHeight - 2

      element.style.top = difference + 'px'
      element.classList.toggle('display-none')
    }

    $scope.addToCart = () => {
      UserFactory.addToCart($scope.pickedProduct.sku)
      document.querySelector('#checkout-now').classList.remove('hidden')
    }
  })
