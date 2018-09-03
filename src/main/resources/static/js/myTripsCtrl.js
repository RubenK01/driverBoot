myApp.controller('myTripsCtrl', function ($scope, utils,$uibModal,MantenimientoSrv ) {
	$scope.allClass = 'active';
	$scope.driverClass =  '';
	$scope.passClass = '';
	$scope.$parent.addActivo('My Trips');

	MantenimientoSrv.getUser($scope).then(function(data){

		$scope.usuario = data.data;
		if(!data.data.userImg){
			$scope.usuario.userImg = "/images/icons/defaultDriver.png";
		}
		else{
			$scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
		}
		
		$scope.viajes = $scope.usuario.viajes;
		if($scope.usuario.viajesCreados.length > 0){
			$scope.viajes = $scope.usuario.viajes.concat($scope.usuario.viajesCreados);
		}

		for(var i = 0; i < $scope.viajes.length; i++){
			$scope.viajes[i].hora = '';
			$scope.viajes[i].fecha = '';
			$scope.viajes[i].classMinuto = {"color":"red"};

			if($scope.viajes[i].fechaHora < Date.now()){
				$scope.viajes[i].classRow = {"background":"rgb(226, 226, 226)","border": "1px solid rgba(0, 0, 0, 0.43)","border-left": "hidden","border-right": "hidden"};
			}
			else{
				$scope.viajes[i].classRow = {"background":"white","border": "1px solid rgba(0, 0, 0, 0.43)","border-left": "hidden","border-right": "hidden"};
			}

			$scope.viajes[i].hora = utils.horaToStr($scope.viajes[i].fechaHora);
			$scope.viajes[i].fecha = utils.fechaToStr($scope.viajes[i].fechaHora);
			if($scope.usuario.viajesCreados.includes($scope.viajes[i])){
				$scope.viajes[i].classMinuto = {"color":"green"};
			}
		}
		$scope.viajes = $scope.viajes.sort((a,b) => b.fechaHora - a.fechaHora);
	},function(err){
		
	});

	$scope.changeActiveTab = function(tab){
		$scope.allClass = '';
		$scope.driverClass =  '';
		$scope.passClass = '';

		if(tab === 'all'){
			$scope.allClass = 'active';
			$scope.viajes =  $scope.usuario.viajes.concat($scope.usuario.viajesCreados);
			$scope.viajes = $scope.viajes.sort((a,b) => b.fechaHora - a.fechaHora);
		}
		else if(tab === 'driver'){
			$scope.driverClass = 'active';
			$scope.viajes = $scope.usuario.viajesCreados;
			$scope.viajes = $scope.viajes.sort((a,b) => b.fechaHora - a.fechaHora);
		}
		else if ( tab === 'pass'){
			$scope.passClass = 'active';
			$scope.viajes = $scope.usuario.viajes;
			$scope.viajes = $scope.viajes.sort((a,b) => b.fechaHora - a.fechaHora);
		}
	}

	

	$scope.detailTrip = function(viajeId){
		var viajeObj = $scope.viajes.find( viaje => viaje.id === viajeId);

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/html/joinTripModal.html',
        controller: 'ModalViajeCtrl',
        resolve: {
          viaje: function(){
            return viajeObj;
            },
            modalInfo: true,
            usuario: function(){ return $scope.usuario}
        },
        size: 'lg'
      });

      modalInstance.result.then(function () {
      }, function () {
        
      });
	}
});