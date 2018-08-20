myApp.controller('inboxCtrl', function ($scope, utils,$uibModal,MantenimientoSrv ) {
	$scope.allClass = 'active';
	$scope.driverClass =  '';
	$scope.passClass = '';
	$scope.chats = [];
	$scope.$parent.addActivo('Inbox');

	MantenimientoSrv.getUser().then(function(data){

		$scope.usuario = data.data;
		if(!data.data.userImg){
			$scope.usuario.userImg = "/images/icons/defaultDriver.png";
		}
		else{
			$scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
		}
		mensajesToMap();
		getDatosMuestra();
	},function(err){
		
	});

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

	function mensajesToMap(){
		$scope.usuario.mensajesEnviados = $scope.usuario.mensajesEnviados.sort((a,b) => b.fechaHora - a.fechaHora);
		$scope.usuario.mensajesRecibidos = $scope.usuario.mensajesRecibidos.sort((a,b) => b.fechaHora - a.fechaHora);

		$scope.conversacionMap = new Map();

		//pasar mensajes a Map()
		$scope.usuario.mensajesEnviados.forEach(function(m){
			m.class = "msj macro text text-l";
			//m.texto = utils.nl2br(m.texto);
			m.fechaHoraStr = utils.fechaToStr(m.fechaHora) + ' ' + utils.horaToStr(m.fechaHora) ;
			if($scope.conversacionMap.get(m.receptor.email) == null){
				var listaMensajes = [];
				listaMensajes.push(m);
				$scope.conversacionMap.set(m.receptor.email, listaMensajes);
			}
			else
				$scope.conversacionMap.get(m.receptor.email).push(m);
		});
		$scope.usuario.mensajesRecibidos.forEach(function(m){
			m.class = "msj-rta macro text text-r";
			//m.texto = utils.nl2br(m.texto);
			m.fechaHoraStr = utils.fechaToStr(m.fechaHora) + ' ' + utils.horaToStr(m.fechaHora) ;
			if($scope.conversacionMap.get(m.emisor.email) == null){
				var listaMensajes = [];
				listaMensajes.push(m);
				$scope.conversacionMap.set(m.emisor.email, listaMensajes);
			}
			else
				$scope.conversacionMap.get(m.emisor.email).push(m);
		});

	}

	
	
	function getDatosMuestra(){
		$scope.chats = []
		for (var [key, value] of $scope.conversacionMap) {
			var ultimoItem = $scope.conversacionMap.size-1;
			value[ultimoItem].fechaHoraStr = utils.fechaToStr(value[ultimoItem].fechaHora) + ' ' + utils.horaToStr(value[ultimoItem].fechaHora) ;
			if($scope.usuario.mensajesEnviados.includes(value[ultimoItem])){
						value[ultimoItem].datosReceptor = {};
						value[ultimoItem].datosReceptor = value[ultimoItem].receptor;
						$scope.chats.push(value[ultimoItem]);
					}
			else{
				value[ultimoItem].datosReceptor = {};
				value[ultimoItem].datosReceptor = value[ultimoItem].emisor;
				$scope.chats.push(value[ultimoItem]);
			}
		}
	}
	
	

	$scope.modalMensaje = function(email){
		var chat = $scope.chats.find(c => c.datosReceptor.email === email);
		var receptor = chat.datosReceptor;
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
		modalInstance.result.then(function (msg) {
			$scope.conversacionMap.set(msg.email,msg);

			getDatosMuestra();
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
						mensajesToMap();

	      				getDatosMuestra();
					},function(err){
						
					});
	      });
	} 


	//$scope.viajes = $scope.viajes.sort((a,b) => b.fechaHora - a.fechaHora);

	/*$scope.showMessages = function(name){
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
	}*/
});