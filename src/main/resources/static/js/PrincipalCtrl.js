

//var myApp = angular.module('DriverApp',['restPruebaApp', 'ngRoute','ngAnimate','ui.bootstrap', 'ngMap', 'google-maps']);
var myApp = angular.module('DriverApp',['ngMask', 'ui.bootstrap']);


//myApp.controller('PrincipalCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
myApp.controller('PrincipalCtrl',['$scope', function($scope){
	
	
//	var $ctrl = this;
//	$ctrl.items = ['item1', 'item2', 'item3'];
//	
	var reader = new FileReader();
	$scope.listCars = [];
	
	$scope.addCar = function() {
		var car = {};
		car.model = $scope.modelCar;
		car.matricula = $scope.matriculaCar;
		car.color = $scope.colorCar;
		car.img = $scope.fileToUpload;
		
    	reader.onloadend = function () {
		 	car.imgUrl = reader.result;
		 	$scope.listCars.push(car);
		 	limpiaDatosCar();
		 	$scope.$apply();
		  }

		  if ($scope.fileToUpload) {
		    reader.readAsDataURL($scope.fileToUpload);
		  } else {
			  $scope.imgUrl = "";//meter img por defecto (logo?)
			  $scope.listCars.push(car);
			  limpiaDatosCar();
			  $scope.$apply();
		  };  	
		
	}
	
	function limpiaDatosCar(){
		$scope.modelCar = '';
		$scope.matriculaCar= '';
		$scope.colorCar= '';
		//sdocument.getElementById('my_file').click();
		//$scope.fileToUpload= undefined;
	}
	
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
//	
//	$scope.modalAddCar = function() {
//		var modalInstance = $uibModal.open({
//			ariaLabelledBy: 'modal-title-top',
//		    ariaDescribedBy: 'modal-body-top',
//            templateUrl: '/html/addCar.html',
//            controller: 'ModalInstanceCtrl',
//            controllerAs: '$ctrl',
//            size: 'sm',
//            resolve: {
//            	items: function () {
//                    return $ctrl.items;
//                  }
//            }
//            
//        });
//        //TODO - Esto va en un evento de vuelta al origen de apertura del cierre
//        modalInstance.result
//        .then(function () {  //result
//        }, function (/*data*/) {  //reject
//        });
//	}
	
	
	
}]);

//myApp.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
//	  var $ctrl = this;
//	  $ctrl.items = items;
//	  $ctrl.selected = {
//	    item: $ctrl.items[0]
//	  };
//
//	  $ctrl.ok = function () {
//	    $uibModalInstance.close($ctrl.selected.item);
//	  };
//
//	  $ctrl.cancel = function () {
//	    $uibModalInstance.dismiss('cancel');
//	  };
//	});


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


