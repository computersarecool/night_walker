'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:gallery
 * @description
 * # gallery
 */

angular.module('nightwalkerApp')
  .directive('siteGallery', function ($location, $interval, $timeout, $window) {
  
    var list = angular.element('<p style="margin-bottom:50px">Words here</p>');
    var list2 = angular.element('<p style="margin-bottom:50px">Words here</p>');
    var colorPant = angular.element('<div id="top-gallery" class="home-sprite">Some words here</div>');
    var grayPant = angular.element('<div id="bottom-gallery" class="home-sprite gray-gallery gallery-animate">Some More words here</div>');
  
    var link = function (scope, element, attrs) {
      if ($window.DeviceOrientationEvent && screen.width <= 980) {
        var manualChange = (function () {

          var colorChange = function (className) {
            if (!colorPant.hasClass(className)) {
              colorPant.removeAttr('class');
              colorPant.addClass('pant-sprite');
              colorPant.addClass(className);
            }
            if (grayPant.hasClass('fast-gray')) {
              grayPant.removeClass('fast-gray');
              grayPant.addClass('fast-no-gray');
            }
          }


          var checkTilt = function (input, fromMin, fromMax, toMin, toMax, nextColorClass) {
            var opacityValue = (input - fromMax) / (fromMin - fromMax) * (toMin - toMax) + toMax;
            if (opacityValue < .2) {
              opacityValue = 0;
            }
            if (opacityValue > .7) {
              opacityValue = 1;
            }
            if (opacityValue === 1) {
              colorChange(nextColorClass);
            }
            grayPant.css('opacity', opacityValue);
            list2.html('The opacity value is ' + opacityValue);
          }

          var checkAdd = function (oldClass, newClass) {
            if (!grayPant.hasClass(newClass)) {
              grayPant.removeClass(oldClass);
              grayPant.addClass(newClass);
            }
          }
        
          $window.addEventListener('deviceorientation', function(eventData) {
            var tiltLR = eventData.gamma;
            var tiltFB = eventData.beta;
            var dir = eventData.alpha

            list.html('The dir is ' + dir);

            switch (true) {

              case dir >= 0 && dir < 30:
                //Red
                colorChange('blue-pant');
                break

              case dir >= 45 && dir < 75:
                //Orage
                colorChange('red-pant');
                break

              case dir >= 90 && dir < 120:
                //Yellow
                colorChange('blue-pant');
                break
              
              case dir >= 135 && dir < 165:
                //Green
                colorChange('red-pant');
                break
              
              case dir >= 180 && dir < 210:
                //Blue
                colorChange('blue-pant');
                break

              case dir >= 225 && dir < 255:
                //Purple
                colorChange('red-pant');
                break

              case dir >= 270 && dir < 300:
                //Pink
                colorChange('blue-pant');
                break

              case dir >= 315 && dir < 345:
                //Pink2
                colorChange('red-pant');
                break

        //Change class
              case dir >= 30 && dir < 45:
                checkAdd('fast-no-gray', 'fast-gray');
                break   

              case dir >= 75 && dir < 90:
                checkAdd('fast-no-gray', 'fast-gray');
                break 

              case dir >= 120 && dir < 135:
                checkAdd('fast-no-gray', 'fast-gray');
                break   

              case dir >= 165 && dir < 180:
                checkAdd('fast-no-gray', 'fast-gray');
                break   

              case dir >= 210 && dir < 225:
                checkAdd('fast-no-gray', 'fast-gray');
                break  

              case dir >= 255 && dir < 270:
                checkAdd('fast-no-gray', 'fast-gray');
                break  

              case dir >= 300 && dir < 315:
                checkAdd('fast-no-gray', 'fast-gray');
                break  

              case dir >= 345 && dir < 360:
                checkAdd('fast-no-gray', 'fast-gray');
                break   
  
            }
            

          }, false);

        })();

        //End of mobile device function
      } else {





        

        //Not supported or screen is too big
        var autoChange = (function () {

          var index = 0;
          var classes = [
            'apple-gallery',
            'cherry-gallery',
            'electricity-gallery',
            'nectarine-gallery',
            'plum-crazy-gallery',
            'powder-gallery',
            'proton-powder-gallery',
          ];
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
          }
        })();
        $interval(autoChange, 3000);
        //End of desktop callback
      }


      //End of link function
    }




    return {
      restrict: 'E',
      compile: function (tElem) {
        tElem.append(list);
        tElem.append(list2);
        tElem.append(colorPant);
        tElem.append(grayPant);
        return link;
      }
    };
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
