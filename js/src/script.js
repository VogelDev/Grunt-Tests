console.log("test");

var map;

function initMap() {
  var shop = {
    lat: 40.217214,
    lng: -75.060963
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: shop,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.HYBRID
  });
  var marker = new google.maps.Marker({
    position: shop,
    map: map
  });
}
