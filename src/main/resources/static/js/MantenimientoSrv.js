
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

	function getViajes(){
		var deferred = $q.defer();
		var promise = deferred.promise;

		function success(data){
			var viajes = data.data;

			viajes.forEach(function(viaje){
				viaje.fechaHora = new Date(viaje.fechaHora);
			});
	    	

        	deferred.resolve(viajes);
	    };

	    function error(data){

	        deferred.reject(data);
	    };


	    $http({
	            url: '/getTrips',
	            method: 'GET',
	            headers: {'Content-Type': undefined},
	            transformRequest: angular.identity
	        }).then(success , error);

	    return promise;

	}

	function getViajesByDate(date){
		var deferred = $q.defer();
		var promise = deferred.promise;

		var fd = new FormData();

		var dateJson = angular.toJson(date);

		fd.append('dateJson', dateJson);

		function success(data){
			var viajes = data.data;

			viajes.forEach(function(viaje){
				viaje.fechaHora = new Date(viaje.fechaHora);
			});
	    	

        	deferred.resolve(viajes);
	    };

	    function error(data){

	        deferred.reject(data);
	    };


	    $http({
	            url: '/getTripsByDate',
	            method: 'POST',
	            data: fd, 
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

	function saveMessage(messageDTO){
		var deferred = $q.defer();
		var promise = deferred.promise;

		var link = '/saveMessage';
		var fd = new FormData();

		var mensajeJson = angular.toJson(messageDTO);

		fd.append('mensajeJson', mensajeJson);

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
	
	function messageRead(emailReceptor){
		var deferred = $q.defer();
		var promise = deferred.promise;

		var fd = new FormData();

		var emailJson = angular.toJson(emailReceptor);

		fd.append('emailJson', emailJson);

		function success(data){
			
        	deferred.resolve();
	    };

	    function error(data){

	        deferred.reject(data);
	    };


	    $http({
	            url: '/messageRead',
	            method: 'POST',
	            data: fd ,
	            headers: {'Content-Type': undefined},
	            transformRequest: angular.identity
	        }).then(success , error);

	    return promise;

	}
	
	
	return {
		getViajes:getViajes,
		getViajesByDate:getViajesByDate,
		getUser:getUser,
		saveViaje:saveViaje,
		saveMessage:saveMessage,
		messageRead:messageRead
	}
}]);