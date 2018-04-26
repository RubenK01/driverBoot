'use strict';
 
var App = angular.module('DriverApp',['ngRoute']);
 
App.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/signUp', {
            templateUrl: '../html/signUpForm.html'
        })  
}]);