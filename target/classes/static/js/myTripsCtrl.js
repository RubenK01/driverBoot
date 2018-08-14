myApp.controller('myTripsCtrl', function ($scope, utils,$uibModal) {
	$scope.allClass = 'active';
	$scope.driverClass =  '';
	$scope.passClass = '';
	$scope.$parent.addActivo('My Trips');

	$scope.changeActiveTab = function(tab){
		$scope.allClass = '';
		$scope.driverClass =  '';
		$scope.passClass = '';

		if(tab === 'all'){
			$scope.allClass = 'active';
			$scope.viajes =  $scope.usuario.viajes.concat($scope.usuario.viajesCreados);
		}
		else if(tab === 'driver'){
			$scope.driverClass = 'active';
			$scope.viajes = $scope.usuario.viajesCreados;
		}
		else if ( tab === 'pass'){
			$scope.passClass = 'active';
			$scope.viajes = $scope.usuario.viajes;
		}
	}

	$scope.viajes = $scope.usuario.viajes;
	if($scope.usuario.viajesCreados.length > 0){
		$scope.viajes = $scope.usuario.viajes.concat($scope.usuario.viajesCreados);
	}

	for(var i = 0; i < $scope.viajes.length; i++){
		$scope.viajes[i].hora = '';
		$scope.viajes[i].fecha = '';
		$scope.viajes[i].classMinuto = {"color":"red"};

		$scope.viajes[i].hora = utils.horaToStr($scope.viajes[i].fechaHora);
		$scope.viajes[i].fecha = utils.fechaToStr($scope.viajes[i].fechaHora);
		if($scope.usuario.viajesCreados.includes($scope.viajes[i])){
			$scope.viajes[i].classMinuto = {"color":"green"};
		}
	}
	$scope.viajes = $scope.viajes.sort((a,b) => b.fechaHora - a.fechaHora);

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
            modalInfo: true
        },
        size: 'lg'
      });

      modalInstance.result.then(function () {
      }, function () {
        
      });
	}
});