'use strict';

myApp.controller('MenuCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
	$scope.pestaniasMenu = [
					{name: 'Map', style: 'active'},
					{name: 'New Trip', style: 'tablinks'},
					{name: 'My Trips', style: 'tablinks'},
					{name: 'Inbox', style: 'tablinks'},
					{name: 'Profile', style: 'tablinks'} ];
	
	
	$scope.addActivo = function(name){
		$scope.pestaniasMenu.forEach(function(p){
			if(p.name === name){
				p.style = 'tablinks active';
			}
			else{
				p.style = 'tablinks';
			}
		});
	};
}]);