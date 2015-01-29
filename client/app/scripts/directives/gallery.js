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
            if (opacityValue > .7) {
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

              case dir >= 0 && dir < 15:
                //Red
                colorChange('blue-pant');
                break

              case dir >= 45 && dir < 60:
                //Orage
                colorChange('red-pant');
                break

              case dir >= 90 && dir < 105:
                //Yellow
                colorChange('blue-pant');
                break
              
              case dir >= 135 && dir < 150:
                //Green
                colorChange('red-pant');
                break
              
              case dir >= 180 && dir < 195:
                //Blue
                colorChange('blue-pant');
                break

              case dir >= 225 && dir < 240:
                //Purple
                colorChange('red-pant');
                break

              case dir >= 270 && dir < 285:
                //Pink
                colorChange('blue-pant');
                break

              case dir >= 315 && dir < 330:
                //Pink2
                colorChange('red-pant');
                break

        //Increasing opacity
              case dir >= 15 && dir < 30:
                checkTilt(dir, 15, 30, 0, 1.4, 'blue-pant');
                break

              case dir >= 60 && dir < 75:
                checkTilt(dir, 60, 75, 0, 1.4, 'red-pant');
                break

              case dir >= 105 && dir < 120:
                checkTilt(dir, 105, 120, 0, 1.4, 'blue-pant');
                break

              case dir >= 150 && dir < 165:
                checkTilt(dir, 150, 165, 0, 1.4, 'red-pant');
                break

              case dir >= 195 && dir < 210:
                checkTilt(dir, 195, 210, 0, 1.4, 'blue-pant');
                break

              case dir >= 240 && dir < 255:
                checkTilt(dir, 240, 255, 0, 1.4, 'red-pant');
                break

              case dir >= 285 && dir < 300:
                checkTilt(dir, 285, 300, 0, 1.4, 'red-pant');
                break

              case dir >= 330 && dir < 345:
                checkTilt(dir, 330, 345, 0, 1.4, 'red-pant');
                break



        //Decreasing opacity
              case dir >= 30 && dir < 45:
                checkTilt(dir, 30, 45, 1, 0, 'red-pant');
                break   

              case dir >= 75 && dir < 90:
                checkTilt(dir, 75, 90, 1, 0, 'blue-pant');
                break 

              case dir >= 120 && dir < 135:
                checkTilt(dir, 120, 135, 1, 0, 'red-pant');
                break   

              case dir >= 165 && dir < 180:
                checkTilt(dir, 165, 180, 1, 0, 'blue-pant');
                break   

              case dir >= 210 && dir < 225:
                checkTilt(dir, 210, 225, 1, 0, 'red-pant');
                break  

              case dir >= 255 && dir < 270:
                checkTilt(dir, 255, 270, 1, 0, 'red-pant');
                break  

              case dir >= 300 && dir < 315:
                checkTilt(dir, 300, 315, 1, 0, 'red-pant');
                break  

              case dir >= 345 && dir < 360:
                checkTilt(dir, 345, 360, 1, 0, 'red-pant');
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
