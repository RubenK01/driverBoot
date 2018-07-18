myApp.controller('newTripCtrl',['$scope',function($scope){
	var map1, infoWindow;
	function initmap1() {
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

            
        }

        initmap1();

}]);