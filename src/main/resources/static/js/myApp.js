 var myApp = angular.module('MyApp',[]);

myApp.controller('MyAppCrtl',['$scope','$http',function($scope,$http){
	$scope.message = "¡Hola Mundo!";
	
	$scope.showMessage = function (message){
		alert("Valor del mensaje: " + message);
	};
	
	$scope.pruebaRest = function(){
		$http.get('http://localhost:8080/PruebaWeb2/PruebaServlet').
		  success(function(data, status, headers, config) {
			$scope.datos = data;
		  }).
		  error(function(data, status, headers, config) {
			$scope.datos = 'error';
		  });
	}
	
	$scope.pruebaRest();
}]);