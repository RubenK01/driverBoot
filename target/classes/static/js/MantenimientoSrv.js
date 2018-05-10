var restPrueba = angular.module('restPruebaApp',[]);

restPrueba.factory('mantenimientoSrv',['$http','$q',function($http,$q){

	

	prueba = function (id){
		
		
		return 'hola prueba';
	};
		

	
	return {'prueba':prueba}
}]);