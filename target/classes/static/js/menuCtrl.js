'use strict';

myApp.controller('MenuCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
	$scope.pestaniasMenu = [
					{name: 'Map', style: 'active', ico: 'fa fa-globe fa-lg '},
					{name: 'New Trip', style: '', ico: 'fa fa-map-marker fa-lg'},
					{name: 'My Trips', style: '', ico: 'fa fa-car fa-lg'},
					{name: 'Inbox', style: '', ico: 'fa fa-envelope fa-lg'},
					{name: 'Profile', style: 'collapsed', ico: 'fa fa-user fa-lg', submenu: [{name: 'My Account', style:''}, {name: 'Settings', style:''}, {name: 'Logout', style:''} ]} ];
	
	
	$scope.addActivo = function(name){
		$scope.pestaniasMenu.forEach(function(p){
			if(p.name === name){
				p.style = 'active';
			}
			else{
				p.style = '';
			}
		});
	};
}]);