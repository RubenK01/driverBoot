

//var myApp = angular.module('DriverApp',['restPruebaApp', 'ngRoute','ngAnimate','ui.bootstrap', 'ngMap', 'google-maps']);
var myApp = angular.module('DriverApp',['ngMask']);


//myApp.controller('PrincipalCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
myApp.controller('PrincipalCtrl',['$scope',function($scope){
	$scope.showSignUp = true;
	$scope.showLogin = false;
	

	$scope.doSignUp = function(){
	    $scope.showSignUp = true;
	    $scope.showLogin = false;
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


