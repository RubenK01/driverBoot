myApp.controller('modalConversacionCtrl', function ($scope, $modalInstance, receptor, MantenimientoSrv,utils) {
	$scope.receptor = receptor;
	$scope.glued = true
	$scope.conversacionMap = new Map();
	$scope.texto = '';
	$scope.messages = [];

	MantenimientoSrv.getUser().then(function(data){

		$scope.usuario = data.data;
		if(!data.data.userImg){
			$scope.usuario.userImg = "/images/icons/defaultDriver.png";
		}
		else{
			$scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
		}

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
		
		if($scope.conversacionMap.size > 0)
			$scope.messages = $scope.conversacionMap.get(receptor.email).sort((a,b) => b.fechaHora - a.fechaHora);
	 
	},function(err){
		
	});

	
	//ordena Map -> var mapAsc = new Map([...$scope.conversacionMap.entries()].sort());

	//Ordenar Mensajes por fecha.
	/*for (var [key, value] of $scope.conversacionMap) {
		var listaOrdenada = value.sort((a,b) => b.fechaHora - a.fechaHora);
	  	$scope.conversacionMap.set(key, listaOrdenada);
	}*/

	

	//if(usuario.mensajesEnviados[])
	$scope.sendMessage = function(){
		if($scope.texto !== ''){
			var mensajeDTO = {};
			mensajeDTO.receptor = receptor;
			mensajeDTO.receptor.userImg = null;
			mensajeDTO.emisor = null;			
			mensajeDTO.texto = $scope.texto;
			mensajeDTO.leido = false;
			mensajeDTO.fechaHora = new Date;





			MantenimientoSrv.saveMessage(mensajeDTO).then(function(data){
					$scope.texto = '';
					mensajeDTO.class = "msj macro text text-l";
					mensajeDTO.fechaHoraStr = utils.fechaToStr(mensajeDTO.fechaHora) + ' ' + utils.horaToStr(mensajeDTO.fechaHora) ;
					//mensajeDTO.text = utils.nl2br(mensajeDTO.texto);
	               $scope.messages.push(mensajeDTO);  

	               $scope.messages =  $scope.messages.sort((a,b) => b.fechaHora - a.fechaHora);

	               var scrollTop = document.getElementById("divConScroll").scrollTop; 
	          
	        },function(err){
	          
	        });

		}
	}
	$scope.cancel = function () {
	    $modalInstance.dismiss($scope.messages);

	};


});