(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', function($scope) {
        $scope.dishes;
        $scope.message;
        $scope.alert;

        $scope.checkDishes = function() {
            if ($scope.dishes == null || !(/\S/.test($scope.dishes))) {
               $scope.message = "Please enter data first";
               $scope.alert = "red";
            } else {
                var arrayOfDishes = ($scope.dishes).split(',');
                var dishesCount = 0;
                for (var i=0; i < arrayOfDishes.length; i++) {
                    if (/\S/.test(arrayOfDishes[i])) {  //checking if strings have non-whitespace character
                        dishesCount++;
                    }
                }
                if (dishesCount != 0 && dishesCount <= 3) {
                $scope.message = "Enjoy!";
                 }
                 else if (dishesCount > 3) {
                $scope.message = "Too much!";
                }
                $scope.alert = "green";
            }
        }
    });
})();