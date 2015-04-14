//
// Copyright (c) 2015 by Guillermo López Orozco.
// Distributed under the MIT License.
// (http://opensource.org/licenses/MIT)
//

//Create the angular module
angular.module('currencyConverterApp', [])
  //Add the controller's construction function
  .controller('currencyConverterController', ['$scope', '$http', function($scope, $http) {

    //Set the result to 0
    $scope.convertionResult = 0;

    //Set the ratio to null
    $scope.convertionRatio = null;

    //http request to the fixer.io API, if the request is successful it returns a JSON object
    $http.get('https://api.fixer.io/latest').success(function(data, status, headers, config) {
        //log the status code of the request
        console.log(status);
        //Get the USD rate from the object and set the ratio to the current rate
        $scope.convertionRatio = data.rates.USD;
      })
      .error(function(data, status, headers, config) {
        //If there was an error log the status code of the request
        console.log(status);
      });

    $scope.convert = function(amount) {
      //Check if the amount is a number
      if (Number.isFinite(amount)) {
        //Calculate the result
        $scope.convertionResult = amount * $scope.convertionRatio;
      } else {
        //If the amount is not a number, the result is 0
        $scope.convertionResult = 0;
      }
    };

  }]);
