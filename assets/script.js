var map;
var service;
var infowindow;
var me;
var lat;
var long;
var marker;
var counter=0;
var marker=[];
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

      var selectedFood = $("select.food").children("option:selected").text();
    
    if(selectedFood=="Hamburger") {
      var food="assets/burger.jfif";
    }
    else if(selectedFood=="American"){
      var food="assets/fry.jfif";
    }
    else if(selectedFood=="Barbecue"){
      var food="assets/bbq.jpg";
    }
    else if(selectedFood=="Chinese"){
      var food="assets/chinese.png";
    }
    else if(selectedFood=="French"){
      var food="assets/french.png";
    }
    else if(selectedFood=="Indian"){
      var food="assets/indian.jpg";
    }
    else if(selectedFood=="Italian"){
      var food="assets/italian.jpg";
    }
    else if(selectedFood=="Japanese"){
      var food="assets/japanese.jpg";
    }
    else if(selectedFood=="Mexican"){
      var food="assets/mexican.jpg";
    }
    else if(selectedFood=="Pizza"){
      var food="assets/pizza.jpg";
    }
    else if(selectedFood=="Seafood"){
      var food="assets/seafood.jpg";
    }
    else if(selectedFood=="Steak"){
      var food="assets/steak.jpg";
    }
    else if(selectedFood=="Sushi"){
      var food="assets/sushi.png";
    }
    else {
      var food="assets/thai.jpg";
    }
     

$("#food").css('background-image','url('+food+')');

}
function callback(results, status) {

  if (status == google.maps.places.PlacesServiceStatus.OK) {
    if (counter!=0){
      clearmarkers();
    }
    counter++;
    for (var i = 0; i < 4; i++) {
      var place = results[i];
      ;
      var ResName=results[i].name;
      
      var ResAdr=results[i].formatted_address;
      
      var ResRate= results[i].rating;
      var resPrice = results[i].price_level;
      var lt=results[i].geometry.location.lat();
      var lg=results[i].geometry.location.lng();
      me = new google.maps.LatLng(lt,lg);
      
      var mark = new google.maps.Marker({
        position: me,
      title: ResName });
     marker.push(mark);
        marker[i].setMap(map);


      if (resPrice == 1){
        resPrice="$";
      }
      else if(resPrice==2) {
          resPrice="$$";
      }
      else if(resPrice==3) {
        resPrice="$$$";
      }
      else if(resPrice==4) {
        resPrice="$$$$";
      }
      else if(resPrice==5) {
        resPrice="$$$$$";
      }
      else {
        resPrice= "No Price Data"
      }
        $("#place"+i).append("<div class=info><b>"+ResName+"</b></div>")
        $("#place"+i).append("<div class=info>"+ResAdr+"</div>")
        $("#place"+i).append("<div class=info><u>"+'Rating: ' +ResRate+"</u></div>")
        $("#place"+i).append("<div class=info>"+'Price Level: ' +resPrice+"</div>")
    








    }
  }
}
getLocation();


function clearmarkers() {
  marker[0].setMap(null);
  marker[1].setMap(null);
  marker[2].setMap(null);
  marker[3].setMap(null);
  marker=[]
  
}