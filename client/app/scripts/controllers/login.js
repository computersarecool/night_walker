'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nightwalkerApp
 */

angular.module('nightwalkerApp')
  .controller('LoginCtrl', function ($scope, $http, $location) {
    //Local references so that there that we don't use $scope every time
    var user;
    var signup;

    // Create a scope for our sign up page. It will hold data and methods
    $scope.signup = signup = {};

    // We will be using the ng-model attributes to populate this object
    signup.user = user = {};

    //This is the method that will post to our server
    signup.submit = function () {
      //Make sure all fields are filled out

      if (!user.firstname ||
          !user.lastname ||
          !user.email ||
          !user.password1 ||
          !user.password2
      ) {
        alert('Please fill out all form fields.');
        return false
      }
      //Make sure passwords match
      if (user.password1 !== user.password2) {
        alert('Your passwords must match.');
        return false
      }
      //Just so we can confim that the bindings are working
      console.log(user);
      //Make the request to the server

      var request = $http.post('/signup', user);

      //What to do with successful post
      request.success(function (data) {
        console.log(data);
        $location.url('/spam');
      });

      request.error(function (data) {
        //There was an error
        console.log(data);
      });

    };

  });  
