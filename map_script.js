// Initialize the map
var map = L.map('map').setView([0, 0], 25); // Set initial coordinates and zoom level

// Add the tile layer (you can use different tile providers, here we use OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker for the phone's location
var phoneMarker = L.marker([0, 0]).addTo(map); // Initialize marker with dummy coordinates

// Function to update phone marker position
function updatePhoneMarker(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  var newLatLng = L.latLng(lat, lng);
  
  // Move the marker to the new coordinates
  phoneMarker.setLatLng(newLatLng);
  
  // Pan the map to the new coordinates
  map.panTo(newLatLng);
}

// Function to handle errors in geolocation
function handleGeolocationError(error) {
  console.log('Error getting geolocation:', error);
}

// Get the current position of the device
if ('geolocation' in navigator) {
  navigator.geolocation.watchPosition(updatePhoneMarker, handleGeolocationError);
} else {
  console.log('Geolocation is not supported by this browser.');
}