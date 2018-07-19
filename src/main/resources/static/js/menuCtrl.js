
myApp.controller('menuCtrl',['$scope','MantenimientoSrv',function($scope,MantenimientoSrv){
	$scope.pestaniasMenu = [
					{name: 'Map', url: '/#/', style: 'active', ico: 'fa fa-globe fa-lg '},
					{name: 'New Trip', url: '/#/newTrip', style: '', ico: 'fa fa-map-marker fa-lg'},
					{name: 'My Trips', url: '/#/myTrips',style: '', ico: 'fa fa-car fa-lg'},
					{name: 'Inbox', url: '/#/inbox',style: '', ico: 'fa fa-envelope fa-lg'},
					{name: 'Profile', url: '/#/profile',style: 'collapsed', ico: 'fa fa-user fa-lg', submenu: [{name: 'My Account',url: '/', style:''}, {name: 'Settings', url: '/',style:''}, {name: 'Log Out', style:''} ]} ];
	
	$scope.selectedName = 'map';

	$scope.usuario = {};

	MantenimientoSrv.getUser().then(function(data){

		$scope.usuario = data.data;
		$scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
		
	},function(err){
		
	});

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