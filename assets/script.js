var map;
var service;
var infowindow;
var me;
var lat;
var long;
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);

    }
}
function showPosition(position) {
lat=position.coords.latitude;
long=position.coords.longitude;

  me = new google.maps.LatLng(lat,long);

  map = new google.maps.Map(document.getElementById('map'), {
      center: me,
      zoom: 15
    });

 
}
function search(){
    $(".info").remove();
    var srh = document.getElementById("wgtmsr");
	var res = srh.options[srh.selectedIndex].value;
    var request = {
        location: me,
        radius: '5000',
        query: res,
        type: 'restaurant'
      };
    
      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);
}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < 4; i++) {
      var place = results[i];
      console.log(results[i]);
      var ResName=results[i].name;
      console.log(ResName);
      var ResAdr=results[i].formatted_address;
      console.log(ResAdr);
        $("#place"+i).append("<div class=info>"+ResName+"</div>")
        $("#place"+i).append("<div class=info>"+ResAdr+"</div>")
    }
  }
}
getLocation();
