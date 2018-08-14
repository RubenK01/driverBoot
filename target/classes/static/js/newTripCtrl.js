myApp.controller('newTripCtrl',['$scope', 'MantenimientoSrv',function($scope,MantenimientoSrv){
	//variables
	var map1, infoWindow;
	$scope.timeTrip = 0;
  $scope.$parent.addActivo('New Trip');

	function initMapNewTrip() {
		var madrid = {lat: 40.41672271132239, lng: -3.703230192680735 };
            map1 = new google.maps.Map(document.getElementById('map1'), {
            zoom: 15,
            center: madrid,
            zoomControl: true,
            gestureHandling: 'cooperative',
            mapTypeId: 'roadmap',
            scaleControl: true
          });
           infoWindow = new google.maps.InfoWindow;

           // Try HTML5 geolocation.
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('You are here.');
                infoWindow.open(map1);
                map1.setCenter(pos);
              });
            }  

            new AutocompleteDirectionsHandler(map1);            
        }

        initMapNewTrip();

        /**
        * @constructor
       */
      function AutocompleteDirectionsHandler(map) {
      	this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'DRIVING';
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
       /* var modeSelector = document.getElementById('mode-selector');*/
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});
      	this.route = function(){
	        if (!this.originPlaceId || !this.destinationPlaceId) {
	          return;
	        }
	        var me = this;

	        this.directionsService.route({
	          origin: {'placeId': this.originPlaceId},
	          destination: {'placeId': this.destinationPlaceId},
	          travelMode: this.travelMode/*,
	          drivingOptions: {
			    departureTime:  ,  
			    trafficModel: 'optimistic'
			  }*/
	        }, function(response, status) {
	          if (status === 'OK') {
	            me.directionsDisplay.setDirections(response);
	            $scope.timeTrip = Math.round(response.routes[0].legs[0].duration.value / 60); 
              $scope.origin = response.routes[0].legs[0].start_address;
              $scope.destination = response.routes[0].legs[0].end_address;
              $scope.latOrigen = response.routes[0].legs[0].start_location.lat();
              $scope.lngOrigen = response.routes[0].legs[0].start_location.lng();
              $scope.latDestino = response.routes[0].legs[0].end_location.lat();
              $scope.lngDestino = response.routes[0].legs[0].end_location.lng()
	            $scope.$apply();
	          } else {
	            window.alert('Directions request failed due to ' + status);
	          }
	        });
	      };
      		this.setupPlaceChangedListener = function(autocomplete, mode) {
	        var me = this;
	        autocomplete.bindTo('bounds', this.map);
	        autocomplete.addListener('place_changed', function() {
	          var place = autocomplete.getPlace();
	          if (!place.place_id) {
	            window.alert("Please select an option from the dropdown list.");
	            return;
	          }
	          if (mode === 'ORIG') {
	            me.originPlaceId = place.place_id;
	          } else {
	            me.destinationPlaceId = place.place_id;
	          }
	          me.route();
        	});

      	};


        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

      }

      $scope.addTrip = function(){
        $scope.loading = true;
        var viajeDTO = {};

        viajeDTO.plazas = $scope.seats;
        viajeDTO.minutos = $scope.timeTrip;
        //
        /*var fechaHora = new Date($scope.date);
        fechaHora.setTime($scope.time);
        viajeDTO.fechaHora = fechaHora;*/
        viajeDTO.fechaHora = $scope.date;

        //
        var mapaDTO = {};
        mapaDTO.descOrigen = $scope.origin;
        mapaDTO.descDestino = $scope.destination;
        mapaDTO.latOrigen = $scope.latOrigen ;
        mapaDTO.lngOrigen =$scope.lngOrigen ;
        mapaDTO.latDestino = $scope.latDestino;
        mapaDTO.lngDestino = $scope.lngDestino;
        viajeDTO.mapa = mapaDTO;
        viajeDTO.pasajeros = [];
        viajeDTO.conductor = null;

        function success(data){
          limpiaDatos();
          $scope.loading = false;
        };

        function error(data){
          $scope.loading = false;
        };

        MantenimientoSrv.saveViaje(viajeDTO).then(success , error);



      } 

      function limpiaDatos(){
        $scope.origin = '';
        $scope.destination = '';
        $scope.date = '';
        $scope.date = '';
        $scope.car = '';
        $scope.seats = '';
      }   

}]);