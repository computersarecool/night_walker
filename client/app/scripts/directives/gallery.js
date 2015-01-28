'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:gallery
 * @description
 * # gallery
 */

angular.module('nightwalkerApp')
  .directive('siteGallery', function ($location, $interval, $timeout, $window) {
  
    var grayPant = angular.element('<div id="bottom-gallery" class="pant-sprite gray-pant">Some More words here</div>');
    var colorPant = angular.element('<div id="top-gallery" class="pant-sprite blue-pant">Some words here</div>');
    var list = angular.element('<p></p>');

    var autoChange = (function () {
      var index = 0;
      var classes = ['blue-pant', 'red-pant'];
      colorPant.addClass(classes[index])
      grayPant.addClass('gallery-animate');

      return function () {
        grayPant.addClass('displayed');
        $timeout(function () {
          grayPant.removeClass('displayed');
          colorPant.removeClass(classes[index]);
          if (++index === classes.length) {
            index = 0;
          }
          colorPant.addClass(classes[index]);
        }, 2000);
        console.log('The index is ' + index);
      }
    }()); 

    var manualChange = (function () {
      // Listen for the deviceorientation event and handle the raw data
      $window.addEventListener('deviceorientation', function(eventData) {

        grayPant.addClass('gallery-fast');
        // gamma is the left-to-right tilt in degrees, where right is positive
        var tiltLR = eventData.gamma;
        // beta is the front-to-back tilt in degrees, where front is positive
        var tiltFB = eventData.beta;
        // alpha is the compass direction the device is facing in degrees
        var dir = eventData.alpha
        console.log(tiltLR);

        switch (true) {
          case tiltLR < -40:
            //BLUE
            colorPant.removeAttr('class');
            colorPant.addClass('pant-sprite');
            colorPant.addClass('blue-pant');
            grayPant.removeClass('displayed');
            break;
          case tiltLR >= -37 && tiltLR < -29:
            //PURPLE
            colorPant.removeAttr('class');
            colorPant.addClass('pant-sprite');
            colorPant.addClass('red-pant');
            grayPant.removeClass('displayed');
            break;
          case tiltLR >= -26 && tiltLR < -18:
            //PINK
            colorPant.removeAttr('class');
            colorPant.addClass('pant-sprite');
            colorPant.addClass('blue-pant');
            grayPant.removeClass('displayed');
            break;
          case tiltLR >= -15 && tiltLR < -7:
            //POWDER PINK
            colorPant.removeAttr('class');
            colorPant.addClass('pant-sprite');
            colorPant.addClass('red-pant');
            grayPant.removeClass('displayed');
            break;
          case tiltLR >= -4 && tiltLR  < 4:
            //RED
            colorPant.removeAttr('class');
            colorPant.addClass('pant-sprite');
            colorPant.addClass('blue-pant');
            grayPant.removeClass('displayed');
            break;
          case tiltLR >= 7 && tiltLR < 15:
            //ORANGE
            colorPant.removeAttr('class');
            colorPant.addClass('pant-sprite');
            colorPant.addClass('red-pant');
            grayPant.removeClass('displayed');
            break;
          case tiltLR >= 18 && tiltLR < 26:
            //ORANGE
            colorPant.removeAttr('class');
            colorPant.addClass('pant-sprite');
            colorPant.addClass('blue-pant');
            grayPant.removeClass('displayed');
            break;
          case tiltLR >= 29 && tiltLR  < 37:
            //YELLOW
            colorPant.removeAttr('class');
            colorPant.addClass('pant-sprite');
            colorPant.addClass('blue-pant');
            grayPant.removeClass('displayed');
            break;
          case tiltLR > 40:
             //GREEN
             grayPant.removeClass('displayed');
            grayPant.removeClass('displayed');
            break;

          case tiltLR >= -40 && tiltLR < -37:
          case tiltLR >= -29 && tiltLR < -26:
          case tiltLR >= -18 && tiltLR < -15:
          case tiltLR >= -7 && tiltLR < -4:
          case tiltLR >= 4 && tiltLR < 7:
          case tiltLR >= 15 && tiltLR < 18:
          case tiltLR >= 26 && tiltLR < 29:
          case tiltLR >= 37 && tiltLR < 40:
            grayPant.addClass('displayed');
            console.log('something');
            //GRAY
            break
        } 
      }, false);
    });

  
    var link = function (scope, element, attrs) {
      if ($window.DeviceOrientationEvent && screen.width <= 980) {
        manualChange();
      } else {
        //Not supported or screen is too big
        autoChange();
        $interval(autoChange, 3000);
      }
    } 

    return {
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      compile: function (tElem) {
        tElem.append(list);
        tElem.append(colorPant);
        tElem.append(grayPant);
        return link;
      }
    }
  });

















/*    
  return function (scope, element, attrs) {
      var promise;

      console.log(element.children());

      scope.start = function () {
        scope.stop();

        promise = $interval(function () {
          console.log('Hi there');
        }, 500);
      }

      scope.stop = function () {
        $interval.cancel(promise);
      }

      scope.start();

      scope.$on('$destroy', function () {
        scope.stop();
      });
    
    }
  */
