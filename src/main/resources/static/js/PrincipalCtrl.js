

//var myApp = angular.module('DriverApp',['restPruebaApp', 'ngRoute','ngAnimate','ui.bootstrap', 'ngMap', 'google-maps']);
var myApp = angular.module('DriverApp',['ngMask', 'ui.bootstrap']);


//myApp.controller('PrincipalCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
myApp.controller('PrincipalCtrl',['$scope', '$uibModal',function($scope, $uibModal){
	$scope.showSignUp = true;
	$scope.showLogin = false;
	

	$scope.doSignUp = function(){
	    $scope.showSignUp = true;
	    $scope.showLogin = false;
	}
	
	$scope.modalAddCar = function() {
		var modalInstance = $uibModal.open({
            //backdrop: 'static',
            templateUrl: '/html/addCar.html',
            //controller: 'ventanaCierreCtrl',
            /*resolve: {
                items: function () {
                    return {
                        data: dataAp,
                        claveSolicitud: datosEntrada.kSolicitud,
                        kGrupo: datosEntrada.kGrupo,
                        modoCons: datosEntrada.modoConsulta,
                        cModalidad: datosEntrada.cModalidad,
                        cIdioma: datosEntrada.cIdioma,
                        consObjCierre: datosConsulta,
                        sActualizSupto: sUpdateSupt,
                        sAutorizaciones: sAutorizations,
                        cOrigenSup: datosEntrada.cOrigenSup
                    };
                }
            },*/
            size: 'lg'
        });
        //TODO - Esto va en un evento de vuelta al origen de apertura del cierre
        modalInstance.result
        .then(function () {  //result
//            if(datosEntrada.origen === 'CAPTURA'){
//                $rootScope.$broadcast('aceptarCierreCaptura');
//            } else if (datosEntrada.origen === 'GESTSOL'){
//                $rootScope.$broadcast('aceptarCierreGestSol');
//            } else if (datosEntrada.origen === 'GESTSUP'){
//                $rootScope.$broadcast('aceptarCierreGestSup');
//            }
        }, function (/*data*/) {  //reject
//            if(datosEntrada.origen === 'CAPTURA'){
//                $rootScope.$broadcast('cancelarCierreCaptura', data);
//            } else if (datosEntrada.origen === 'GESTSOL'){
//                $rootScope.$broadcast('cancelarCierreGestSol', data);
//            } else if (datosEntrada.origen === 'GESTSUP'){
//                $rootScope.$broadcast('cancelarCierreGestSup', data);
//            }
        });
	}
	
//	$scope.rellenaFecha = function(){
//		if($scope.fLicense){
//			if($scope.fLicense.length === 1 && $scope.fLicense !== '1'){
//				$scope.fLicense = $scope.fLicense + '/';
//			}
//		}
//		else{
//			$scope.fLicense = '';
//		}
//		
//		
//	}
	
	
}]);


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


//directiva necesaria para hacer funcionar el input type="file", si se usa ng-model en lugar de esta directiva el fichero no se seta en el scope
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

//]);


