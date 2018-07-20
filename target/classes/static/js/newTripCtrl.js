myApp.controller('newTripCtrl',['$scope',function($scope){
	//variables
	var map1, infoWindow;
	$scope.timeTrip = 0;


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
      	/*this.setupClickListener('changemode-walking', 'WALKING');
        this.setupClickListener('changemode-transit', 'TRANSIT');
        this.setupClickListener('changemode-driving', 'DRIVING');*/

        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

       /* this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);*/
      
      }

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      /*AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };*/

      

}]);