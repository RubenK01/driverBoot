var myApp = angular.module('DriverApp',['restPruebaApp','ngAnimate','ui.bootstrap']);

myApp.controller('PrincipalCtrl',['$scope','$http','mantenimientoSrv',function($scope,$http,mantenimientoSrv){
	$scope.showSignUp = false;
	$scope.showLogin = true;

	$scope.doSignUp = function(){
	    $scope.showSignUp = true;
	    $scope.showLogin = false;
	}
	
	
}]);




//directiva necesaria para hacer funcionar el input type="file", si se usa ng-model en lugar de esta directiva el fichero no se seta en el scope
myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


