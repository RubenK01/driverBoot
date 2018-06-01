

//var myApp = angular.module('DriverApp',['restPruebaApp', 'ngRoute','ngAnimate','ui.bootstrap', 'ngMap', 'google-maps']);
var myApp = angular.module('DriverApp',['ngMask', 'ngAnimate', 'ui.bootstrap']);


//myApp.controller('PrincipalCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
myApp.controller('PrincipalCtrl',['$scope','$http', '$q','$uibModal', '$log', function($scope,$http, $q,$uibModal, $log){
	
	
//	var $ctrl = this;
//	$ctrl.items = ['item1', 'item2', 'item3'];
//	
	
	$scope.listCars = [];
	
	$scope.submit = function(){
		var link = '/registration';
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
		
		var UserRegistrationDto = {};
		UserRegistrationDto.firstName = $scope.firstName;
		UserRegistrationDto.lastName = $scope.lastName;
		UserRegistrationDto.email = $scope.email;
		UserRegistrationDto.confirmEmail = $scope.confirmEmail;
		UserRegistrationDto.password = $scope.password;
		UserRegistrationDto.confirmPassword = $scope.confirmPassword;
		
		$http({
			url: link,
			method: 'POST',
			data : UserRegistrationDto
		}).then(success , error);
		
//		
//		HttpSrv.post(link,datos).then(success, error);
	}
	
	$scope.items = ['item1', 'item2', 'item3'];
	$scope.show = function (size) {

	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: '/html/addCar.html',
	      controller: 'ModalInstanceCtrl',
	      size: 'sm'
	    });

	    modalInstance.result.then(function (car) {
	    	$scope.listCars.push(car);
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };
	
	
	
//	function limpiaDatosCar(){
//		$scope.modelCar = '';
//		$scope.matriculaCar= '';
//		$scope.colorCar= '';
//		//sdocument.getElementById('my_file').click();
//		//$scope.fileToUpload= undefined;
//	}
	
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

myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
	var reader = new FileReader();
	var car = {};
	
	  
	  $scope.ok = function () {
		car.model = $scope.modelCar;
		car.matricula = $scope.matriculaCar;
		car.color = $scope.colorCar;
		car.img = $scope.fileToUpload;
		
		reader.onloadend = function () {
		 	car.imgUrl = reader.result;
		 	$scope.$apply();
		 	//limpiaDatosCar();
		 	$scope.$apply();
		  }

		  if ($scope.fileToUpload) {
		    reader.readAsDataURL($scope.fileToUpload);
		  } else {
			  $scope.imgUrl = "";//meter img por defecto (logo?)
			  //$scope.listCars.push(car);
			  //limpiaDatosCar();
			  //$scope.$apply();
		  };  	
	    $modalInstance.close(car);
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss();
	  };
});


//myApp.config(function($routeProvider) {
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

myApp.directive("fileModel",function() {
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

myApp.directive("fileread", [function () {
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
//myApp.directive('fileModel', ['$parse', function ($parse) {
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


