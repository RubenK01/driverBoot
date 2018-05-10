'use strict';

myApp.controller('menuCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
	$scope.pestaniasMenu = [
					{name: 'Map', style: 'active', ico: 'fa fa-globe fa-lg '},
					{name: 'New Trip', style: '', ico: 'fa fa-map-marker fa-lg'},
					{name: 'My Trips', style: '', ico: 'fa fa-car fa-lg'},
					{name: 'Inbox', style: '', ico: 'fa fa-envelope fa-lg'},
					{name: 'Profile', style: 'collapsed', ico: 'fa fa-user fa-lg', submenu: [{name: 'My Account', style:''}, {name: 'Settings', style:''}, {name: 'Log Out', style:''} ]} ];
	
	$scope.selectedName = 'map';

	$scope.addActivo = function(name, subName){
		//limpia estilos
		$scope.pestaniasMenu.forEach(function(p){
			p.style = '';

			if(p.submenu){
				p.submenu.forEach(function(s){
					s.style = '';
				});
			}

		});

		$scope.pestaniasMenu.forEach(function(p){
			if(p.name === name && !p.submenu){
				p.style = 'active';
				$scope.selectedName = p.name.toLowerCase().replace(' ','');
			}
			else if(p.name === name && p.submenu && subName){
				p.style = 'active';
				p.submenu.forEach(function(s){
					if(s.name === subName){
						s.style = 'active';
						$scope.selectedName = s.name.toLowerCase().replace(' ','');
					}
				});
			}

		});


	};
}]);