

//var myApp = angular.module('DriverApp',['restPruebaApp', 'ngRoute','ngAnimate','ui.bootstrap', 'ngMap', 'google-maps']);
var myApp = angular.module('DriverApp',['ngMask', 'ui.bootstrap']);


//myApp.controller('PrincipalCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
myApp.controller('PrincipalCtrl',['$scope', function($scope){
	
	
//	var $ctrl = this;
//	$ctrl.items = ['item1', 'item2', 'item3'];
//	
	var reader = new FileReader();
	$scope.listCars = [];
	$scope.car = {};
	$scope.addCar = function() {
		
		$scope.car.model = $scope.modelCar;
		$scope.car.matricula = $scope.matriculaCar;
		$scope.car.color = $scope.colorCar;
		$scope.car.img = $scope.fileToUpload;
		
		$scope.imgCar = $scope.car.img;
		getImg($scope.fileToUpload);
		$scope.listCars.push($scope.car);
	}
	
	function getImg(file){
		 reader.onloadend = function () {
			 	$scope.imgUrl = reader.result;
			  }

			  if (file) {
			    reader.readAsDataURL(file);
			  } else {
				  $scope.imgUrl = "";
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


