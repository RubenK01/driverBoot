
myApp.factory('MantenimientoSrv',['$http','$q',function($http,$q){

	
	var deferred = $q.defer();
	var promise = deferred.promise;

	function getUser(){
		function success(data){
        deferred.resolve(data);
	    };

	    function error(data){
	        deferred.reject(data);
	    };


	    $http({
	            url: '/getUsuario',
	            method: 'GET',
	            headers: {'Content-Type': undefined},
	            transformRequest: angular.identity
	        }).then(success , error);

	    return promise;

	}

	
	
	
	return {getUser:getUser}
}]);