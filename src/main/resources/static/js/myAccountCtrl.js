myApp.controller('myAccountCtrl', function ($scope,MantenimientoSrv,utils) {
	$scope.$parent.addActivo('Profile','My Account');
	MantenimientoSrv.getUser($scope).then(function(data){

		$scope.me = data.data;
		if(!data.data.userImg){
			$scope.me.userImg = "/images/icons/defaultDriver.png";
		}
		else{
			$scope.me.userImg = "data:image/png;base64," + data.data.userImg;
		}

		$scope.me.coches.forEach(function(coche){
			if(!coche.foto){
				coche.foto = "/images/icons/logoNegro.png";
			}
			else{
				coche.foto = "data:image/png;base64," + coche.foto;
			}
		});

		$scope.me.fBirthDateStr = utils.fechaToStr($scope.me.fBirthDate);
		$scope.me.fExpiryDatetr = utils.fechaToStr($scope.me.fExpiryDate);
		
	},function(err){
		
	});

});