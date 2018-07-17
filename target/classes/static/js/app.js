'use strict';

var myApp = angular.module('DriverApp',['ngRoute', 'ngAnimate', 'ui.bootstrap']);

myApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl :"html/map.html",
		controller: "mapCtrl"
    })
    .when("/newTrip", {
        templateUrl :"html/newTrip.html",
		controller: "newTripCtrl"
    })
    .when("/myTrips", {
        templateUrl :"html/map.html",
		controller: "mapCtrl"
    })
	.otherwise({redirectTo:'/'});
	
});