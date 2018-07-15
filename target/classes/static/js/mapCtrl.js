/*myApp.factory('MarkerCreatorService', function () {

    var markerId = 0;


       

    function create(latitude, longitude) {
        var marker = {
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'    
            },
            latitude: latitude,
            longitude: longitude,
            id: ++markerId          
        };
        return marker;        
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                alert("Unknown address: " + address);
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('Unable to locate current position');
        }
    }

    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
    };

});
*/
//myApp.controller('MapCtrl', [ '$ngMap', function(NgMap) {
//	  NgMap.getMap().then(function(map) {
//	    console.log(map.getCenter());
//	    console.log('markers', map.markers);
//	    console.log('shapes', map.shapes);
//	  });
//	}]);

myApp.controller('mapCtrl', ['$scope','$compile', function ($scope, $compile) {

        var map, infowindow;

        $scope.angularOk = function(){
            return false;
        };
        var madrid = {lat: 40.41672271132239, lng: -3.703230192680735 };

        // Initialize and add the map
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: madrid,
            zoomControl: true,
            gestureHandling: 'cooperative',
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
                infoWindow.open(map);
                map.setCenter(pos);
              });
            }             
        }

        initMap();

        var contentString =  '<button type="buttton" ng-click="angularOk();">Click Me</button>';
        var compiledContent = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow;
        //infowindow.setContent(contentString);

        var marker = new google.maps.Marker({
          position: madrid,
          map: map,
          title: 'Madrid (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', (function(marker, contentString) {
                    return function() {
                        infowindow.setContent(contentString);
                        infowindow.open(map, marker);
                    };
                })(marker, compiledContent[0], $scope));

       /* marker.addListener('click', function() {
          infowindow.open(map, marker);
        });*/




       /* MarkerCreatorService.createByCoords(40.454018, -3.509205, function (marker) {
            marker.options.labelContent = 'Autentia';
            $scope.autentiaMarker = marker;
        });
        
        $scope.address = '';

        $scope.map = {
            center: {
                latitude: $scope.autentiaMarker.latitude,
                longitude: $scope.autentiaMarker.longitude
            },
            zoom: 12,
            markers: [],
            control: {},
            options: {
                scrollwheel: false
            }
        };

        $scope.map.markers.push($scope.autentiaMarker);

        $scope.addCurrentLocation = function () {
            MarkerCreatorService.createByCurrentLocation(function (marker) {
                marker.options.labelContent = 'You´re here';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };
        
        $scope.addAddress = function() {
            var address = $scope.address;
            if (address !== '') {
                MarkerCreatorService.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }*/

    }]);