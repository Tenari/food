Meteor.shared = {
  validateAddress: function(address_store_name){
    var address = $('#address').val();
    
    if (address == Session.get(address_store_name) && $('#map-canvas *').length != 0){
      // we don't need to do another request
    } else {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({address: address}, function(result, status){
        if (status == "ZERO_RESULTS"){
          $('#address').addClass("error").addClass("tooltip").data("tip","Not a valid address");
        } else if (status == "OK"){
          $('#address').removeClass("error").removeClass("tooltip");
          $('#map-canvas').addClass('map-canvas');
          var locLatLng = result[0].geometry.location;
          Session.set('lat', locLatLng.lat());
          Session.set('lng', locLatLng.lng());
          var map_opts = {
            center: new google.maps.LatLng(locLatLng.lat(), locLatLng.lng()),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map( document.getElementById('map-canvas'), map_opts);
          var loc = new google.maps.Marker({
            map: map,
            position: locLatLng
          });
        }
      });
    }
  },
  localOrders: function(){
    var now_time = new Date().getTime();
    var open_orders = Orders.find({
      taker: "noneyet",
      "details.expire": {$gt: now_time}
    }).fetch();
    var good_orders = [];
    var chef_location = Meteor.user().profile.location;
    if (chef_location == undefined)
      return [];
    var chef_point = new google.maps.LatLng( chef_location.lat, chef_location.lng);
    var order_point, d;
    for (var i = 0; i < open_orders.length; i++){
      order_point = new google.maps.LatLng( open_orders[i].details.location.lat, open_orders[i].details.location.lng);

      d = google.maps.geometry.spherical.computeDistanceBetween(chef_point, order_point);
      if (d < (1609 * open_orders[i].details.max_distance)){
        good_orders.push(open_orders[i]);
      }
    }
    return good_orders;
  }
};
