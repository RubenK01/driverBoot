
myApp.controller('mapCtrl', ['$scope','$compile', '$http','MantenimientoSrv','$uibModal', 'utils', function ($scope, $compile,$http,MantenimientoSrv,$uibModal, utils) {

        var map, infowindow, infowindows = [];
        var markers = [];
        var directionsService = new google.maps.DirectionsService, directionsDisplay = new google.maps.DirectionsRenderer;
        $scope.viajes = [];
        $scope.error = '';
        $scope.$parent.addActivo('Map')

        $scope.angularOk = function(){
            return false;
        };
        var madrid = {lat: 40.41672271132239, lng: -3.703230192680735 };

        function cargaViajes(){
          MantenimientoSrv.getViajes().then(function(data){

            $scope.viajes = data;

            loadMarkers();
            
            
          },function(err){
            
          });
        }

        cargaViajes();

        $scope.searchByDate = function(){
          if(!$scope.dateSearch || $scope.dateSearch == ''){
            $scope.error = '';
            cargaViajes();
            initMap();
          }
          else if($scope.dateSearch < Date.now()){
            $scope.error = 'You can not search past trips';
          }
          else{
            $scope.error = '';
            cargaViajesByDate($scope.dateSearch);
            initMap();
          }
        }

        function cargaViajesByDate(date){
          MantenimientoSrv.getViajesByDate(date).then(function(data){

            $scope.viajes = data;

            loadMarkers();
            
            
          },function(err){
            
          });
        }

        // Initialize and add the map
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
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
                if (infowindow) {
                    infowindow.close();
                }
                //infoWindow.setPosition(pos);
                //infoWindow.setContent('You are here.');
                //infoWindow.open(map);
                map.setCenter(pos);
              });
            }  

             // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);     

             // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });   

             markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();

              if (places.length == 0) {
                return;
              }

              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];

              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                /*var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));*/

                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });   
        }

        initMap();


        function loadMarkers(){
          $scope.viajes.forEach(function(viaje){
            
            var horaStr = utils.horaToStr(viaje.fechaHora);
            var fehaStr = utils.fechaToStr(viaje.fechaHora);
            var contentString =  
            '<div> <label>Origin:  </label><span> '+viaje.mapa.descOrigen + '</span>' +
            '<br/> <label>Destination:  </label><span> '+viaje.mapa.descDestino +'</span>' +
            '<br/> <label>Date:  </label><span> '+ fehaStr + '</span>' +
            '<br/> <label>Time:  </label><span> '+ horaStr + '</span>' +
            '<br/> <label>Duration:  </label><span> '+viaje.minutos + ' min.</span>' +
            '<br/> <label>Avaible Seats:   </label><span> '+ (viaje.plazas - viaje.pasajeros.length).toString() +'/'+ (viaje.plazas).toString() +'</span>' +
            '<br/> <button style="float: right;" type="buttton" class="btn btn-default" ng-click="showModal('+ viaje.id +');">Join</button></div>';
            var compiledContent = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow;
            infowindows.push(infowindow);

            //infowindow.setContent(contentString);
            google.maps.event.addListener(infowindow, 'closeclick', (function() {
              directionsDisplay.setMap(null);
            }));

            var ico = '/images/icons/favicon111.png';
            var marker = new google.maps.Marker({
              position: {lat: parseFloat(viaje.mapa.latOrigen) ,lng: parseFloat(viaje.mapa.lngOrigen) },
              map: map,
              ico:ico,
              title: 'Origin'
            });

            google.maps.event.addListener(marker, 'click', (function(marker, contentString) {
                return function() {

                  infowindows.forEach(function(iw){
                    iw.close();
                  });

                    route(viaje);
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                };
            })(marker, compiledContent[0], $scope));
          });

        }

        

        var route = function(viaje){         
          
          directionsDisplay.setMap(map);

          directionsService.route({
            origin: {lat: parseFloat(viaje.mapa.latOrigen) ,lng: parseFloat(viaje.mapa.lngOrigen)},
            destination: {lat: parseFloat(viaje.mapa.latDestino) ,lng: parseFloat(viaje.mapa.lngDestino)},
            travelMode: 'DRIVING'/*,
            drivingOptions: {
          departureTime:  ,  
          trafficModel: 'optimistic'
        }*/
          }, function(response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
              
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
        };

      $scope.showModal = function (viajeId) {
          var viajeObj = $scope.viajes.find( viaje => viaje.id === viajeId);

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/html/joinTripModal.html',
            controller: 'ModalViajeCtrl',
            resolve: {
              viaje: function(){
                return viajeObj;
                },
              modalInfo: false,
              usuario: $scope.usuario
            },
            size: 'lg'
          });

          modalInstance.result.then(function () {
            infowindows.forEach(function(iw){
                    iw.close();
                  });
             MantenimientoSrv.getViajes().then(function(data){

                $scope.viajes = data;

                loadMarkers();
              },function(err){
                
              });
             MantenimientoSrv.getUser($scope).then(function(data){

                $scope.usuario = data.data;
                if(!data.data.userImg){
                  $scope.usuario.userImg = "/images/icons/defaultDriver.png";
                }
                else{
                  $scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
                }
                
                //enviar evento para cambiar minutos
                $scope.$emit('minutos', $scope.usuario.minutos);
                
              },function(err){
                
              });
          }, function () {
            MantenimientoSrv.getUser($scope).then(function(data){

                $scope.usuario = data.data;
                if(!data.data.userImg){
                  $scope.usuario.userImg = "/images/icons/defaultDriver.png";
                }
                else{
                  $scope.usuario.userImg = "data:image/png;base64," + data.data.userImg;
                }
                
                
              },function(err){
                
              });
          });
      };
  
        
        

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