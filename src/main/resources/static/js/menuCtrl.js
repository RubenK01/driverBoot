
myApp.controller('menuCtrl',['$scope','MantenimientoSrv',function($scope,MantenimientoSrv){
	$scope.newMessages = false;
	$scope.pestaniasMenu = [
					{name: 'Map', url: '/#/', style: 'active', ico: 'fa fa-globe fa-lg '},
					{name: 'New Trip', url: '/#/newTrip', style: '', ico: 'fa fa-map-marker fa-lg'},
					{name: 'My Trips', url: '/#/myTrips',style: '', ico: 'fa fa-car fa-lg'},
					{name: 'Inbox', url: '/#/inbox',style: '', ico: 'fa fa-envelope fa-lg'},
					{name: 'Profile', url: '/#/profile',style: 'collapsed', ico: 'fa fa-user fa-lg', submenu: [{name: 'My Account',url: '/#/myAccount', style:''}, /*{name: 'Settings', url: '/',style:''},*/ {name: 'Log Out', style:''} ]} ];
	
	$scope.selectedName = 'map';

	$scope.usuario = {};

	MantenimientoSrv.getUser($scope).then(function(data){

		$scope.usuario = data.data;
		if(!data.data.userImg){
			$scope.usuario.userImg = "/images/icons/defaultDriver.png";
		}
		else{
			$scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
		}
		
		$scope.usuario.mensajesRecibidos.forEach(function(m){
			if(!m.leido){
				$scope.newMessages = true;
			}
		});
		
	},function(err){
		
	});

	//recoger evento si se cambian minutos (al hacer join)
	$scope.$on('minutos', function(evt, min){
		$scope.usuario.minutos = min;
	});

	//recoger evento si se reciben o se leen mensajes
	$scope.$on('mensajes', function(evt, newMessages){
		$scope.newMessages = newMessages;
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