'use strict';

myApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl :"html/map.html",
		controller: "mapCtrl"
    })
	.otherwise({redirectTo:'/'});
	
});