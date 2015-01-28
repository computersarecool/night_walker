'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:gallery
 * @description
 * # gallery
 */

angular.module('nightwalkerApp')
  .directive('siteGallery', function ($location, $interval, $timeout, $window) {
  
    var grayPant = angular.element('<div id="bottom-gallery" class="pant-sprite gray-pant gallery-animate">Some More words here</div>');
    var colorPant = angular.element('<div id="top-gallery" class="pant-sprite">Some words here</div>');
    var list = angular.element('<p style="margin-bottom:50px">Words here</p>');
  
    var link = function (scope, element, attrs) {
      if ($window.DeviceOrientationEvent && screen.width <= 980) {
        var manualChange = (function () {
          grayPant.removeClass('gallery-animate');
          $window.addEventListener('deviceorientation', function(eventData) {

            var tiltLR = eventData.gamma;
            var tiltFB = eventData.beta;
            var dir = eventData.alpha
          

            var colorChange = function (className) {
              if (!colorPant.hasClass(className)) {
                colorPant.removeAttr('class');
                colorPant.addClass('pant-sprite');
                colorPant.addClass(className);
              };
            }

            var checkTilt = function (valueMax, valueMin, tiltMax, tiltMin) {
              var percent = (tiltLR - tiltMin) / (tiltMax - tiltMin);
              var opacityValue = percent * (valueMax - valueMin) + valueMin;
              if (opacityValue < .1) {
                opacityValue = 0;
              }
              if (opacityValue > .9) {
                opacityValue = 1;
              }
              grayPant.css('opacity', opacityValue);
            }

            
            switch (true) {

              case tiltLR > -30 && tiltLR < -1:
                //Tilt to the left for blue
                colorChange('blue-pant');
                checkTilt(1, 0, 0, -30);
                break


              case tiltLR >= 1 && tiltLR < 30:
                //Tilt to the right for red
                colorChange('red-pant');
                checkTilt(1, 0, 0, 30);
                break
            } 
          }, false);
        })();

      } else {
        //Not supported or screen is too big
        var autoChange = (function () {

          var index = 0;
          var classes = ['blue-pant', 'red-pant'];
          colorPant.addClass(classes[index])

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
        })();

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
