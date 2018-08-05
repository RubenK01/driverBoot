

//var myAppIni = angular.module('DriverIni',['restPruebaApp', 'ngRoute','ngAnimate','ui.bootstrap', 'ngMap', 'google-maps']);
var myAppIni = angular.module('DriverIni',['ngMask', 'ngAnimate', 'ui.bootstrap']);


//myAppIni.controller('PrincipalCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
myAppIni.controller('PrincipalCtrl',['$scope','$http', '$q','$uibModal', '$log','$window', function($scope,$http, $q,$uibModal, $log, $window){
	
	
//	var $ctrl = this;
//	$ctrl.items = ['item1', 'item2', 'item3'];
//	
	
	//Variables
	$scope.gender = 'm';	
	$scope.listCars = [];
	$scope.errors = [];
	$scope.loading = false;
	$scope.login = true;
	var check = true;
	var input = $('.validate-input input');
	var emailNoCopia = document.getElementById('email');

	emailNoCopia.oncopy = function(e) {
	    e.preventDefault();
	  }

	//////////validacion dni//////////////////
	/*
	 * Funcion para  validar si es NIF
	 */
	function esNIF(a) {
		var campo = a;
		var c = campo.length;
		// d = '00000000',

		for (var i = 0; i < 9 - c; i++) {
			campo = '0' + campo;
		}
		var e = /^[KLM0-9]\d{7}[A-Z]$/i;
		var b = e.test(campo);
		return b;
	}
	/*
	 * Funcion para  validar si es un NIF correcto
	 */
	function vNIF(d) {
		var c = 'TRWAGMYFPDXBNJZSQVHLCKET',
			num;
		if (!esNIF(d)) {
			return false;
		}
		var a = d;
		var b = a.length;
		for (var i = 0; i < 9 - b; i++) {
			a = '0' + a;
		}
		if (a.charAt(0) > '9' || a.charAt(0) < '0') {
			num = parseInt(a.substring(1, 8), 10) % 23;
		} else {
			num = parseInt(a.substring(0, 8), 10) % 23;
		}
		if (c.charAt(num) === a.charAt(8).toUpperCase()) {
			return true;
		} else {
			return false;
		}
	}
	function vNIFCIF(a) {
		if(a==""){
			return false;
		}
		var A = a.toUpperCase();
		A = A.replace('-', '')
		
		if (esNIF(A)) {
			if (vNIF(A)) {
				return true;
			}
		} 
		return false;
	}

	///////////////////
	$scope.changeLogin = function(){
		var newVar = !$scope.login;
		$scope.login = newVar;

		limpiaInputs();
	}

	function limpiaInputs(){
		$scope.errors = [];
		$scope.username = '';
		$scope.passLogin = '';
		$scope.firstName = '';
		$scope.lastName = '';
		$scope.email = '';
		$scope.confirmEmail = '';
		$scope.password = '';
		$scope.confirmPassword = '';
		$scope.fLicense = '';
		$scope.dni = '';
		$scope.phone = '';
		$scope.fBirth = '';
		$scope.gender = '';
		$scope.userImg = '';
	}

    $('.validate-form').on('submit',function(){
        check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
    	if($(input).attr('name') == 'confirmEmail' ){
        	var email = document.getElementById('email');
        	if($(input).val() !== '' && $(input).val() !== email.value){
        		$scope.errors.push("Confirm email error");
        		return false;
        	}
        	
        }
        else if($(input).attr('name') == 'confirmPassword' ){
        	var password = document.getElementById('password');
        	if($(input).val() !== '' &&  $(input).val() !== password.value){
        		$scope.errors.push("Confirm password error");
        		return false;
        	}
        	
        }
        else if($(input).attr('name') == 'dni' ){
        	var dni = document.getElementById('dni');
        	if(dni.value !== '' && !vNIFCIF(dni.value)){
        		$scope.errors.push("The DNI is incorrect");
        		return false;
        	}
        	
        }
        else if($(input).attr('name') == 'fExpLicense' ){
        	var fExpLicense = document.getElementById('fExpLicense');
        	
        	if(fExpLicense.value !== ''){
        		var dt = new Date(fExpLicense.valueAsDate);
        		var dtNow = new Date();

        		if(dt < dtNow){
        			$scope.errors.push("Your license has expired");
        		}
        	}
        	
        }
        else if($(input).attr('name') == 'birthDate' ){
        	var birthDate = document.getElementById('birthDate');
        	if(birthDate.value !== ''){
        		var dt = new Date(birthDate.valueAsDate);
        		var dtNow = new Date();
        		var errorEdad = false;

        		if(dtNow.getFullYear() - dt.getFullYear() <= 18){
        			if(dtNow.getFullYear() - dt.getFullYear() === 18){
        				if(dtNow.getMonth() <= dt.getMonth()){
        					if(dtNow.getMonth() === dt.getMonth()){
        						if(dtNow.getDate() < dt.getDate()){
        							errorEdad = true;
        						}
        					}
        					else{
        						errorEdad = true;
        					}
        				}
        			}
        			else
        				errorEdad = true;

        		}
        		if(dt > dtNow){
        			$scope.errors.push("Sorry, you can't drive if you are in the future");
        		}else if(errorEdad){
        			$scope.errors.push("Sorry, you can't drive if you are a baby :(");
        		}

        		
        	}
        	
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
	
	$scope.submit = function(){
		var link = '/registration';
		var deferred = $q.defer();
		$scope.loading = true;
		$scope.errors = [];
		check = true;
		
		var fd = new FormData();

		if(!$scope.userImg){
			$scope.userImg = 0;
		}
		fd.append('file', $scope.userImg);
		
		function success(data)
		{
			$scope.loading = false;
			
			if(data.data.codigo != '00'){
				if(data.data.codigo == "01"){
					$('#email').focus();
				}
				if(data.data.codigo == "02"){
					$('#dni').focus();
				}
				$window.scrollTo(0, 0);
				$scope.errors.push(data.data.texto);
			}
			else{
				$window.location = "/login.html";
			}

			deferred.resolve(data);
		}
		function error(data)
		{
			$scope.loading = false;
			deferred.reject(data);
		}
		
		
		var UserRegistrationDto = {};
		UserRegistrationDto.firstName = $scope.firstName;
		UserRegistrationDto.lastName = $scope.lastName;
		UserRegistrationDto.email = $scope.email;
		UserRegistrationDto.password = $scope.password;
		UserRegistrationDto.fExpiryDate = $scope.fLicense;
		UserRegistrationDto.dni = $scope.dni;
		UserRegistrationDto.phone = $scope.phone;
		UserRegistrationDto.fBirthDate = $scope.fBirth;
		UserRegistrationDto.gender = $scope.gender;
		
		fd.append('form', angular.toJson(UserRegistrationDto));
		
		var listCarsDto = [], imgCars = [];
		var car = {};
		for(var i = 0; i < $scope.listCars.length; i++){
			car = {};
			car.modelo = $scope.listCars[i].model;
			car.matricula = $scope.listCars[i].matricula;
			car.color = $scope.listCars[i].color;
			if(!$scope.listCars[i].img)
				$scope.listCars[i].img = 0;
			imgCars.push( $scope.listCars[i].img );

			fd.append('imgCars'+i , $scope.listCars[i].img );
			listCarsDto.push(car);
		}
		
		if(listCarsDto.length > 0)
			
			fd.append('formCars', angular.toJson(listCarsDto));
		else
		{
			check = false;
			$window.scrollTo(0, 0);
			$scope.errors.push("You need to add at least one car.")
		}

		for(var i=2; i<input.length; i++) {
            if(validate(input[i]) == false || input[i].value === ''){
                //showValidate(input[i]);
                check=false;
            }
            else{
            	hideValidate(input[i]);
            }
        }

        if($scope.errors.length > 0){
        	check = false;
        }
		
		if(check){
			$http({
				url: link,
				method: 'POST',
				data : fd,
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity
			}).then(success , error);
		}
		else{
			$window.scrollTo(0, 0);
			$scope.loading = false;
		}
	}
	
	$scope.deleteCar = function(matricula){
		var idx;

		for(var i = 0; i < $scope.listCars.length; i++){
			if($scope.listCars[i].matricula === matricula){
				idx = i;
				break;
			}
		}

		$scope.listCars.splice(i,1);
	}
	
	//$scope.items = ['item1', 'item2', 'item3'];
	$scope.show = function (size) {

	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/html/addCar.html',
	      controller: 'ModalInstanceCtrl',
	      resolve: {
	      	listaCoches: function(){
	      		return $scope.listCars;
	      		}
	  		},
	      size: 'md'
	    });

	    modalInstance.result.then(function (car) {
	    	$scope.listCars.push(car);
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	};
	
		  
/*	function loginAuto(){
		var f = {};
		var link = '/login';
		var deferred = $q.defer();
		
		function success(data)
		{
			var da = data;
			deferred.resolve(da);
		}
		function error(data)
		{
			var da = data;
			deferred.reject(da);
		}
		
		f.username = $scope.email;
		f.password = $scope.password;
		
		var fJSON = angular.toJson(f);
		
		$http({
			url: link,
			method: 'POST',
			data : f,
			headers: {'Content-Type': undefined},
			transformRequest: angular.identity
		}).then(success , error);
			
	} */
	
	function getImg(file){
		 reader.onloadend = function () {
			 	//$scope.imgUrl = reader.result;
			 	//$scope.$apply();
			 	return reader.result;
			  }

			  if (file) {
			    reader.readAsDataURL(file);
			  } else {
				 // $scope.imgUrl = "";
				  return "";
			  }
	}

	
	
}]);

myAppIni.controller('ModalInstanceCtrl', function ($scope, $modalInstance, listaCoches) {
	var reader = new FileReader();
	var car = {};

		  
	  $scope.ok = function () {

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
	  };
});


//myAppIni.config(function($routeProvider) {
//    $routeProvider
//    .when("/", {
//        templateUrl :"html/loginForm.html"
//    })
//    .when("/signUp", {
//        templateUrl :"html/signUpForm.html"
//    })
//    .when("/menu", {
//        templateUrl :"html/menu.html"
//    })
//});

myAppIni.directive("fileModel",function() {
	return {
		restrict: 'EA',
		scope: {
			setFileData: "&"
		},
		link: function(scope, ele, attrs) {
			ele.on('change', function() {
				scope.$apply(function() {
					var val = ele[0].files[0];
					scope.setFileData({ value: val });
				});
			});
		}
	}
})

myAppIni.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);


////directiva necesaria para hacer funcionar el input type="file", si se usa ng-model en lugar de esta directiva el fichero no se seta en el scope
//myAppIni.directive('fileModel', ['$parse', function ($parse) {
//    return {
//        restrict: 'A',
//        link: function(scope, element, attrs) {
//            var model = $parse(attrs.fileModel);
//            var modelSetter = model.assign;
//            element.bind('change', function(){
//                scope.$apply(function(){
//                    modelSetter(scope, element[0].files[0]);
//                });
//            });
//        }
//    };
//}
//
//]);


