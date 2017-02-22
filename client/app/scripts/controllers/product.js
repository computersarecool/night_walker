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
    let dragging = false
    let sizeGuide = document.querySelector('#sizemenu')
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
      dragging = true
      xPrevious = e.touches[0].screenX
    }

    $scope.stopScroll = () => {
      dragging = false
      xPrevious = undefined
    }

    $scope.scrollGallery = e => {
      const pictureWidth = document.querySelector('img.individual-main').offsetWidth
      const maxXoffset = -pictureWidth * (numberOfImages - 1)

      if (dragging) {
        xNow = e.touches[0].screenX
        xDelta = xNow - xPrevious
        xOffset = xDelta + parseInt(holder.style.left)

        if (xOffset <= maxXoffset && xDelta <= 0 || xOffset >= 0 && xDelta >= 0) {
          return
        }

        if (isNaN(xOffset)) {
          holder.style.left = '0px'
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
    }

    $scope.scrollTo = pictureName => {
      const pictureWidth = document.querySelector('img.individual-main').offsetWidth
      console.log(pictureWidth)
      if (pictureName === 'front-view') {
        holder.style.left = '0px'
      } else if (pictureName === 'side-view') {
        holder.style.left = pictureWidth + 'px'
      } else if (pictureName === 'detail-view') {
        holder.style.left = pictureWidth * 2 + 'px'
      } else {
        holder.style.left = pictureWidth * 3 + 'px'
      }
    }

    $scope.toggleShow = id => {
      let element = document.querySelector(id)
      let yOffset = $window.scrollY
      element.style.top = yOffset + 'px'
      element.classList.toggle('hidden')
    }

    $scope.addToCart = () => {
      UserFactory.addToCart($scope.pickedProduct.sku)
      document.querySelector('#checkout-now').classList.remove('hidden')
    }
  })
