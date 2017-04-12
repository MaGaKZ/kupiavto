 var app = angular.module('myApp', ['ngSanitize', 'ngRoute']);
 app.controller('extraction', function($scope, $http) {

     var new_cars = [];
     new_cars[0] = { "name": "", "image": "" };
     var ret = [];

     var fentch = function(turl) {
         $http({
             method: "POST",
             url: turl
         }).then(function mySucces(response) {
                 var images = [];

                 //names of Brands
                 var brands = response.data.rows;
                 console.log(brands);
                 //number of total rows 
                 $scope.number_rows = parseInt(response.data.totalRows / 10) + 1;

                 for (var i = 0; i < brands.length; i++) {
                     var str = String(brands[i][2]);
                     new_cars
                     var res = str.replace("/img", "http://88.198.48.246:9031/img");

                     images.push(res);
                 }
                 for (var i = 0; i < brands.length; i++) {
                     new_cars[i] = {
                         "name": brands[i],
                         "image": images[i]
                     }
                 }

                 $scope.cars = new_cars;
             },
             function myError(response) {
                 $scope.brands = response.statusText;
             });
     };


     $scope.range = function() {
         for (var i = 0; i < $scope.number_rows; i++) {
             ret[i] = i + 1;
         }
         return ret;
     };
     $scope.setPage = function(x) {

         fentch("http://88.198.48.246:9031/list/Brand/" + x + "/10/?q=");
     };
     $scope.setPage(0);
 });
