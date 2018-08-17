myApp.controller('myAccountCtrl', function ($scope,MantenimientoSrv ) {
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