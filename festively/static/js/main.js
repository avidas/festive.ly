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
        markers.push(marker);
    }

    function initialize() {

        var initialLon = -97.67315599999999;
        var initialLat = 30.32919;
        var initialLatLon = new google.maps.LatLng(initialLat, initialLon);

        //Set up google map on div map-canvas centering around initial
        //latitude and longitude
        var mapOptions = {
            center: initialLatLon,
            zoom: 14
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        //add marker to initial latitude and longitude
        addMarker(initialLatLon);
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
            map.setZoom(14);
        }
    });
});