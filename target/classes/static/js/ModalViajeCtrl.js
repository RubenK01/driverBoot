myApp.controller('ModalViajeCtrl', function ($scope, $modalInstance, $uibModal, viajeSrv, viaje, utils, modalInfo, usuario) {
	$scope.viaje = viaje;
	$scope.modalInfo = modalInfo;
	$scope.errorsModal = [];

	if(!viaje.conductor.userImg || viaje.conductor.userImg === "/images/icons/defaultDriver.png"){
		$scope.viaje.conductor.userImg = "/images/icons/defaultDriver.png";
	}
	else{
		$scope.viaje.conductor.userImg = "data:image/png;base64," + viaje.conductor.userImg;
	}


	$scope.viaje.pasajeros.forEach(function(p){
		if(!p.userImg || p.userImg === "/images/icons/defaultDriver.png"){
				p.userImg = "/images/icons/defaultDriver.png";
			}
			else{
				p.userImg = "data:image/png;base64," + viaje.conductor.userImg;
			}
	});

	$scope.ageConductor = utils.calcularEdad(viaje.conductor.fBirthDate);
	$scope.viaje.fecha = utils.fechaToStr(viaje.fechaHora);
	$scope.viaje.hora = utils.horaToStr(viaje.fechaHora);


	$scope.joinTrip = function(){
		viajeSrv.joinTrip(viaje.id).then(function(data){
			var retornoForm = data.data;

			if(retornoForm.codigo === '00'){
				MantenimientoSrv.getUser().then(function(data){

						$scope.usuario = data.data;
						if(!data.data.userImg){
							$scope.usuario.userImg = "/images/icons/defaultDriver.png";
						}
						else{
							$scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
						}
						
						
					},function(err){
						
					});
				 var modalInstance = $uibModal.open({
		            animation: true,
		            templateUrl: '/html/modalInfo.html',
		            /*resolve: {
		              viaje: function(){
		                return viajeObj;
		                }
		            },*/
		            size: 'sm'
		          });
				modalInstance.result.then(function () {
		            
		          }, function () {
		            
		          });
				$modalInstance.close();
			}
			else if(retornoForm.codigo == '01'){
				$scope.errorsModal = [];
				$scope.errorsModal.push(retornoForm.descripcion);
			}
          
        },function(err){
          
        });

	}
	$scope.cancel = function () {
	    $modalInstance.dismiss();

	};

	$scope.modalMensaje = function(email){
		var receptor = {};

		if(email === viaje.conductor.email){
			receptor = viaje.conductor;
		}
		else{
			viaje.pasajeros.forEach(function(p){
				if(p.email === email){
					receptor = p;
				}
			});
		}
		var modalInstance = $uibModal.open({
	        animation: true,
	        templateUrl: '/html/modalConversacion.html',
	        resolve: {
	          receptor: function(){
	            return receptor;
	            },
	            usuario: function(){ return usuario}
	        },
	        controller: 'modalConversacionCtrl',
	        size: 'md'
	      });
		modalInstance.result.then(function () {
	        MantenimientoSrv.getUser().then(function(data){

						$scope.usuario = data.data;
						if(!data.data.userImg){
							$scope.usuario.userImg = "/images/icons/defaultDriver.png";
						}
						else{
							$scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
						}
						
						
					},function(err){
						
					});
	      }, function () {
	        MantenimientoSrv.getUser().then(function(data){

						$scope.usuario = data.data;
						if(!data.data.userImg){
							$scope.usuario.userImg = "/images/icons/defaultDriver.png";
						}
						else{
							$scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
						}
						
						
					},function(err){
						
					});
	      });
	} 
});