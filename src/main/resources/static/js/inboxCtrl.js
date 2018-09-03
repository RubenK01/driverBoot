myApp.controller('inboxCtrl', function ($scope, utils,$uibModal,MantenimientoSrv ) {
	$scope.allClass = 'active';
	$scope.driverClass =  '';
	$scope.passClass = '';
	$scope.chats = [];
	$scope.$parent.addActivo('Inbox');

	MantenimientoSrv.getUser($scope).then(function(data){

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
			//var ultimoItem = $scope.conversacionMap.size-1;
			value = value.sort((a,b) => b.fechaHora - a.fechaHora);
			value[0].fechaHoraStr = utils.fechaToStr(value[0].fechaHora) + ' ' + utils.horaToStr(value[0].fechaHora) ;
			value[0].class = {"background":"rgb(226, 226, 226)","border": "1px solid rgba(0, 0, 0, 0.43)","border-left": "hidden","border-right": "hidden"};
			if($scope.usuario.mensajesEnviados.includes(value[0])){
						value[0].datosReceptor = {};
						value[0].datosReceptor = value[0].receptor;
						$scope.chats.push(value[0]);
					}
			else{
				value[0].datosReceptor = {};
				value[0].datosReceptor = value[0].emisor;
				if(!value[0].leido){
					value[0].class = {"background":"white","border": "1px solid rgba(0, 0, 0, 0.43)", "font-weight":"bold","border-left": "hidden","border-right": "hidden"};
				}
				$scope.chats.push(value[0]);
			}
		}
		$scope.chats = $scope.chats.sort((a,b) => b.fechaHora - a.fechaHora);
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
			/*$scope.conversacionMap.set(msg.email,msg);

			getDatosMuestra();*/
	        MantenimientoSrv.getUser($scope).then(function(data){

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
	      }, function () {
	      	
	        MantenimientoSrv.getUser($scope).then(function(data){

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