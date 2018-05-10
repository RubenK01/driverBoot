'use strict';

myApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl :"html/loginForm.html"
    })
    .when("/signUp", {
        templateUrl :"html/signUpForm.html"
    })
    .when("/menu", {
        templateUrl :"html/menu.html",
        controller: "menuCtrl"
    })
	.when("/map", {
        templateUrl :"html/map.html",
        controller: "mapCtrl"
    })
});