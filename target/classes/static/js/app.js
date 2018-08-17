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
        templateUrl :"html/myTrips.html",
		controller: "myTripsCtrl"
    })
    .when("/inbox", {
        templateUrl :"html/inbox.html",
        controller: "inboxCtrl"
    })
    .when("/myAccount", {
        templateUrl :"html/myAccount.html",
        controller: "myAccountCtrl"
    })
	.otherwise({redirectTo:'/'});
	
});