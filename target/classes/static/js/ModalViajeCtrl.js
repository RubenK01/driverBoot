myApp.controller('ModalViajeCtrl', function ($scope, $modalInstance, viaje) {
	$scope.viaje = viaje;

	if(!viaje.conductor.userImg){
		$scope.viaje.conductor.userImg = "/images/icons/defaultDriver.png";
	}
	else{
		$scope.viaje.conductor.userImg = "data:image/png;base64," + viaje.conductor.userImg;
	}

	 /* $scope.ok = function () {

	  	var check = true;
		$scope.errorsModal = [];

	  	if(!$scope.modelCar || !$scope.matriculaCar || !$scope.colorCar ){
	  		$scope.errorsModal.push("Fill out all the fields");
	  		check = false;
	  	}
	  	else{
	  		//comprobar matrícula única
	  		for(var i = 0; i < listaCoches.length; i++){
	  			if(listaCoches[i].matricula === $scope.matriculaCar){
	  				$scope.errorsModal.push("You already used this car registration number");
	  				check = false;
	  				break;
	  			}
	  		}
	  		if(check){
	  			car.model = $scope.modelCar;
				car.matricula = $scope.matriculaCar;
				car.color = $scope.colorCar;
	  		}
	  		
	  	}

		
		car.img = $scope.fileToUpload;

		if(check){
				reader.onloadend = function () {
			 	car.imgUrl = reader.result;
			 	$scope.$apply();
			 	//limpiaDatosCar();
			  }

			  if ($scope.fileToUpload) {
			    reader.readAsDataURL($scope.fileToUpload);
			  } else {
				  car.imgUrl = '/images/icons/logoNegro.png';//meter img por defecto (logo?)
				  //$scope.listCars.push(car);
				  //limpiaDatosCar();
				  //$scope.$apply();
			  };  	
	    	$modalInstance.close(car);
		}
		
		
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss();
	  };*/
});