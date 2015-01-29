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
    var list2 = angular.element('<p style="margin-bottom:50px">Words here</p>');
  
    var link = function (scope, element, attrs) {
      if ($window.DeviceOrientationEvent && screen.width <= 980) {
        var manualChange = (function () {

          var colorChange = function (className) {
            if (!colorPant.hasClass(className)) {
              colorPant.removeAttr('class');
              colorPant.addClass('pant-sprite');
              colorPant.addClass(className);
            };
          }


          var checkTilt = function (input, fromMin, fromMax, toMin, toMax, nextColorClass) {
            var opacityValue = (input - fromMax) / (fromMin - fromMax) * (toMin - toMax) + toMax;
            if (opacityValue < .2) {
              opacityValue = 0;
            }
            if (opacityValue > .8) {
              opacityValue = 1;
            }
            if (opacityValue === 1) {
              colorChange(nextColorClass);
            }
            grayPant.css('opacity', opacityValue);
            list2.html('The opacity value is ' + opacityValue);
          }

        
          $window.addEventListener('deviceorientation', function(eventData) {
            var tiltLR = eventData.gamma;
            var tiltFB = eventData.beta;
            var dir = eventData.alpha

            list.html('The dir is ' + dir);

            switch (true) {

              case dir >= 0 && dir < 22.5:
                //Red
                colorChange('blue-pant');
                break

              case dir >= 45 && dir < 67.5:
                //Orage
                colorChange('red-pant');
                break

              case dir >= 90 && dir < 112.5:
                //Yellow
                colorChange('blue-pant');
                break
              
              case dir >= 135 && dir < 157.5:
                //Green
                colorChange('red-pant');
                break
              
              case dir >= 180 && dir < 202.5:
                //Blue
                colorChange('blue-pant');
                break

              case dir >= 225 && dir < 247.5:
                //Purple
                colorChange('red-pant');
                break

              case dir >= 270 && dir < 292.5:
                //Pink
                colorChange('blue-pant');
                break

              case dir >= 315 && dir < 337.5:
                //Pink2
                colorChange('red-pant');
                break

        //Increasing opacity
              case dir >= 22.5 && dir < 33.75:
                checkTilt(dir, 22.5, 33.75, 0, 1, 'blue-pant');
                break

              case dir >= 67.5 && dir < 78.75:
                checkTilt(dir, 67.5, 78.75, 0, 1, 'red-pant');
                break

              case dir >= 112.5 && dir < 123.75:
                checkTilt(dir, 112.5, 123.75, 0, 1, 'blue-pant');
                break

              case dir >= 157.5 && dir < 168.75:
                checkTilt(dir, 157.5, 168.75, 0, 1, 'red-pant');
                break

              case dir >= 202.5 && dir < 213.75:
                checkTilt(dir, 202.5, 213.75, 0, 1, 'blue-pant');
                break

              case dir >= 247.5 && dir < 258.75:
                checkTilt(dir, 247.5, 258.75, 0, 1, 'red-pant');
                break

              case dir >= 292.5 && dir < 303.75:
                checkTilt(dir, 292.5, 303.75, 0, 1, 'blue-pant');
                break

              case dir >= 337.5 && dir < 348.75:
                checkTilt(dir, 337.5, 348.75, 0, 1, 'red-pant');
                break

        //Decreasing opacity
              case dir >= 33.75 && dir < 45:
                checkTilt(dir, 33.75, 45, 1, 0, 'red-pant');
                break   

              case dir >= 78.75 && dir < 90:
                checkTilt(dir, 78.75, 90, 1, 0, 'blue-pant');
                break              

              case dir >= 123.75 && dir < 135:
                checkTilt(dir, 123.75, 135, 1, 0, 'red-pant');
                break    

              case dir >= 168.75 && dir < 180:
                checkTilt(dir, 168.75, 180, 1, 0, 'blue-pant');
                break    

              case dir >= 213.75 && dir < 225:
                checkTilt(dir, 213.75, 225, 1, 0, 'red-pant');
                break   

              case dir >= 258.75 && dir < 270:
                checkTilt(dir, 258.75, 270, 1, 0, 'blue-pant');
                break  

              case dir >= 303.75 && dir < 315:
                checkTilt(dir, 303.75, 315, 1, 0, 'red-pant');
                break 

              case dir >= 348.75 && dir < 360:
                checkTilt(dir, 348.75, 360, 1, 0, 'blue-pant');
                break   
            }
            

          }, false);


          //grayPant.removeClass('gallery-animate');


        })();

        //End of mobile device function
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
        //End of desktop callback
      }




      //End of link function
    }




    return {
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      compile: function (tElem) {
        tElem.append(list);
        tElem.append(list2);
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
