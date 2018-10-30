var map;
var posMarker;

function onLoad() {
    console.log("In onLoad.");
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
    $("#btn-login").on("touchstart", onLoginPressed);
    console.log("In onDeviceReady.");
    makeBasicMap();
    getCurrentlocation();

}

function makeBasicMap() {
    console.log("In makeBasicMap.");
    map = L.map("map-var", {
        zoomControl: false,
        attributionControl: false
    }).fitWorld();
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        useCache: true
    }).addTo(map);

    map.on("click", function (evt) {
        getCurrentlocation();
    });
}

function showOkAlert(message) {
    navigator.notification.alert(message, null, "WMAP 2018", "OK");
}

function getCurrentlocation() {
    console.log("In getCurrentlocation.");
    navigator.geolocation.getCurrentPosition(
        function (pos) {
            console.log("Got location");
            setMapToCurrentLocation(pos);
        },
        function (err) {
            console.log("Location error: " + err.message);
        },
        {
            enableHighAccuracy: true
        }
    );
}

function setMapToCurrentLocation(myPos) {
    console.log("In setMapToCurrentLocation.");
    if (map.hasLayer(posMarker)) {
        posMarker.remove();
    }

    var myLatLon = L.latLng(myPos.coords.latitude, myPos.coords.longitude);
    posMarker = L.marker(myLatLon);
    posMarker.addTo(map);
    map.flyTo(myLatLon, 15);

    var message = "Your position has been updated\n" +
        "Lat: " + myPos.coords.latitude.toString() + "\n" +
        "Lat: " + myPos.coords.longitude.toString() + "."
    showOkAlert(message);
}

function onLoginPressed() {
    console.log("loginPressed.");
    $.ajax({
        type: "GET",
        url: "http://35.242.161.54:80/api/tokenlogin/",
        data: {
            username: $("#in-username").val(),
            password: $("#in-password").val(),
        }
    }).done(function (data, status, xhr) {
        localStorage.authtoken = localStorage.authtoken = "Token " + xhr.responseJSON.token;
        localStorage.lastUserName = $("#in-username").val();
        localStorage.lastUserPwd = $("#in-password").val();
        console.log("loginPressed2.");

        $.mobile.navigate("#map-page");

    }).fail(function (xhr, status, error) {
        var message = "Login Failed\n";
        message += "Status: " + xhr.status + " " + xhr.responseText;
        showOkAlert(message);
        console.log("FAILED!!!.");

    });
}