'use strict';

myApp.controller('MenuCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
	$scope.pestaniasMenu = [
					{name: 'Viajes', style: 'active'},
					{name: 'Crear Viaje', style: 'tablinks'},
					{name: 'Mis Viajes', style: 'tablinks'},
					{name: 'Mensajes', style: 'tablinks'},
					{name: 'Mi Cuenta', style: 'tablinks'} ];
	
	
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