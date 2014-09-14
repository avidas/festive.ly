$(document).ready(function(){
    google.maps.event.addDomListener(window, 'load', initialize);

    var map;
    var markers = [];

    // Add a marker to the map and push to the array.
    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.DROP
        });
        marker.setIcon('http://upload.wikimedia.org/wikipedia/commons/5/55/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Mosque_%E2%80%93_Tourism_%E2%80%93_Light.png');

        markers.push(marker);
    }

    /*
    North Austin Muslim Community Center (30.389909, -97.683871)
Nueces Mosque (30.283071, -97.744403)
Islamic Center of Greater Austin (30.299660, -97.686769)
Masjid Ibrahim (30.226751, -97.784788)
Islamic Ahlul Bayt Association (30.440130, -97.760555)
Islamic Center of Brushy Creek (30.507722, 97.792039)
Islamic Center of Round Rock (30.494335, -97.654810)
     */

    function showMosqueMarkers() {
        console.log("here");
        trucks = [[30.389909, -97.683871],[30.283071, -97.744403],[30.299660, -97.686769],[30.226751, -97.784788],[30.440130, -97.760555],[30.507722, 97.792039],[30.494335, -97.654810]];
        for (var i = 0; i < trucks.length; i++) {
            var truckLatLng = new google.maps.LatLng(trucks[i][0], trucks[i][1]);
            addMarker(truckLatLng);
        }
        showMarkers();
    }

    function initialize() {

        var initialLon = -97.67315599999999;
        var initialLat = 30.32919;
        var initialLatLon = new google.maps.LatLng(initialLat, initialLon);

        //Set up google map on div map-canvas centering around initial
        //latitude and longitude
        var mapOptions = {
            center: initialLatLon,
            zoom: 10
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        //add marker to initial latitude and longitude
        //addMarker(initialLatLon);
        showMosqueMarkers();
    };

    // Sets the map on all markers in the array.
    function setAllMap(map) {
        for (var i=0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setAllMap(null);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setAllMap(map);
    }

    //use Google geocoding API to convert address to lat and lon
    function getLatLonFromAddress(search_text) {
        var api_call = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search_text;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", api_call, false);
        xhr.send();

        var location = JSON.parse(xhr.response)['results'][0];
        var location = location['geometry']['location'];

        return location;
    }

    //Attach handler for enter pressed in search bar event
    $('#searchbox').bind('keypress', function(e) {
        if (e.keyCode==13){
            //window.location = "http://festively.herokuapp.com/search-results";

            //clear existing markers on map
            deleteMarkers();
            event.preventDefault();

            //exchange address for latitude and longitude
            var search_text = $('#searchbox').val();
            var location = getLatLonFromAddress(search_text);
            var latitude = location['lat'];
            var longitude = location['lng'];
            console.log(latitude);
            console.log(longitude);

            //Set up map center and zoom around new address
            var latlng = new google.maps.LatLng(latitude, longitude);
            addMarker(latlng);
            map.setCenter(latlng);
            map.setZoom(10);
        }
    });
});