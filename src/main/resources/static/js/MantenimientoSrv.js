
myApp.factory('MantenimientoSrv',['$http','$q',function($http,$q){

	
	
	function getUser(){
		var deferred = $q.defer();
		var promise = deferred.promise;

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

	function saveViaje(viajeDTO){
		var deferred = $q.defer();
		var promise = deferred.promise;

		var link = '/saveTrip';
		var fd = new FormData();

		var viajeJson = angular.toJson(viajeDTO);

		fd.append('viajeJson', viajeJson);

		function success(data){
        deferred.resolve(data);
	    };

	    function error(data){
	        deferred.reject(data);
	    };

		$http({
				url: link,
				method: 'POST',
				data : fd,
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity
			}).then(success , error);

		return promise;

	}
	
	
	
	return {
		getUser:getUser,
		saveViaje:saveViaje
	}
}]);