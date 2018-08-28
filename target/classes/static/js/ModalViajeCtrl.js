myApp.controller('ModalViajeCtrl', function ($scope, $modalInstance, $uibModal, viajeSrv, viaje, utils, modalInfo, usuario,MantenimientoSrv) {
	$scope.viaje = viaje;
	$scope.modalInfo = modalInfo;
	$scope.errorsModal = [];
	$scope.usuario = usuario;

	if(!viaje.conductor.userImg || viaje.conductor.userImg === "/images/icons/defaultDriver.png"){
		$scope.viaje.conductor.foto = "/images/icons/defaultDriver.png";
	}
	else if(!$scope.viaje.conductor.userImg.includes("data:image/png;base64,")){
		$scope.viaje.conductor.foto = "data:image/png;base64," + viaje.conductor.userImg;
	}


	$scope.viaje.pasajeros.forEach(function(p){
		if(!p.userImg || p.userImg === "/images/icons/defaultDriver.png"){
				p.foto = "/images/icons/defaultDriver.png";
			}
			else{
				p.foto = "data:image/png;base64," + p.userImg;
			}
			p.age = utils.calcularEdad(p.fBirthDate);
	});

	if(!$scope.viaje.coche.foto || $scope.viaje.coche.foto === "/images/icons/defaultDriver.png"){
		$scope.viaje.coche.fotoShow = "/images/icons/logoNegro.png";
	}
	else if(!$scope.viaje.conductor.userImg.includes("data:image/png;base64,")){
		$scope.viaje.coche.fotoShow = "data:image/png;base64," + viaje.coche.foto;
	}
	
	$scope.ageConductor = utils.calcularEdad(viaje.conductor.fBirthDate);
	$scope.viaje.fecha = utils.fechaToStr(viaje.fechaHora);
	$scope.viaje.hora = utils.horaToStr(viaje.fechaHora);


	$scope.joinTrip = function(){
		viajeSrv.joinTrip(viaje.id).then(function(data){
			var retornoForm = data.data;

			if(retornoForm.codigo === '00'){
				/*MantenimientoSrv.getUser().then(function(data){

						$scope.usuario = data.data;
						if(!data.data.userImg){
							$scope.usuario.userImg = "/images/icons/defaultDriver.png";
						}
						else{
							$scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
						}
						
						
					},function(err){
						
					});*/
					var mensajeDTO = {};
					mensajeDTO.receptor = viaje.conductor;
					mensajeDTO.receptor.userImg = null;
					mensajeDTO.emisor = null;			
					mensajeDTO.texto = "[Automatic Message] Hi, I join to your trip.";
					mensajeDTO.leido = false;
					mensajeDTO.fechaHora = new Date;

					MantenimientoSrv.saveMessage(mensajeDTO).then(function(data){
			          
			        },function(err){
			          
			        });
					var message = 'You joined correctly';
				 var modalInstance = $uibModal.open({
		            animation: true,
		            templateUrl: '/html/modalInfo.html',
		            resolve: {
		              message: function(){
		                return message;
		                }
		            },
		            controller: 'modalInfoCtrl',
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
	            }
	        },
	        controller: 'modalConversacionCtrl',
	        size: 'md'
	      });
		modalInstance.result.then(function () {
	        
	      }, function () {
	      
	      });
	} 
});