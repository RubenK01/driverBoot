myApp.factory('viajeSrv',['$http','$q',function($http,$q){

	function joinTrip(viajeId){
		var deferred = $q.defer();
		var promise = deferred.promise;

		var link = '/joinTrip';
		var fd = new FormData();

		var viajeJson = angular.toJson(viajeId);

		fd.append('viajeId', viajeJson);

		function success(data){
        	deferred.resolve(data);
	    };

	    function error(data){
	        deferred.reject(data);
	    };

		$http({
				url: link,
				method: 'POST',
				data :fd ,
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity
			}).then(success , error);

		return promise;

	}
	
	
	
	
	return {
		joinTrip:joinTrip
	}
}]);