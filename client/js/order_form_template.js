Template.orderform.helpers({
  odds: function(e){
    // super basic odds. should get more specific as they fill out the form.
    var done_orders = Orders.find({finished: {$in: ["rated","delivered"]}}).count();
    var total_orders = Orders.find().count();
    return (done_orders/total_orders*100).toFixed(2);
  },
  delivery: function(){
    return Session.get('order-type') == 'delivery';
  },
  isValid: function(){
    var address, zip, city, state, country;
    zip = Template.orderform.zipgood();
  //  return address && zip && city && state && country;
    return zip;
  },
  zipgood: function(){
    var zip;
    var zip_val = $('#zip').val().trim();
    zip = (zip_val.length == 5)
          &&
          (!zip_val.match(/[a-z]/ig));
    return zip;
  },
  validate6: function(){return true;},
  validate5: function(){
    if ($('#price').val() <= 0){
      $('#price').val('0');
    }
    if ($('#price').val() < 5){
      $('#price-encouragment').remove();
      $('#order5 p:last').append("<p id='price-encouragment'>You can do better, bro.</p>");
    } else {
      $('#price-encouragment').remove();
    }
    return true;
  },
  validate4: function(){
    if ($('#minutes').val() <= 0){
      $('#minutes').val('0');
    }
    return true;
  },
  validate3: function(){
    return Template.orderform.isValid();
  },
  validate2: function(){
    Session.set('order-type', $('#order2 select').val());
    return true;
  }
});
Template.orderform.events({
  'change': function(e){
    var spot = $(e.target).data('spot');
    var name = $(e.target).data('name');
    if (Session.get('order-'+name) ==undefined){
      if (Template.orderform['validate'+spot] != undefined){
        var valid = Template.orderform['validate'+spot]();
        if (valid){
          Session.set('order-spot', spot+1);
          $('#order'+(spot+1)).fadeIn(700);
          $('#order'+(spot+1)+' *').show();
        }
      }else{
        Session.set('order-spot', spot+1);
        $('#order'+(spot+1)).fadeIn(700);
        $('#order'+(spot+1)+' *').show();
      }
    }else{
      if (Template.orderform['validate'+spot] != undefined){
        var valid = Template.orderform['validate'+spot]();
      }
    }
    Session.set('order-'+name, $(e.target).val());
    if($("#order"+(spot+1)).length ==0){
      $('#submit').fadeIn(900);
    }
  },
  'click #submit':function(){
    if (Template.orderform.isValid()) {
      var now_time = new Date().getTime();
      Orders.insert({
        placer: Meteor.user()._id,
        taker: "noneyet",
        finished: "nottaken",
        details: {
          placed: now_time,
          food: $('#order1').val(),
          type: $('#order2 select').val(),
          max_distance: 50,
          location: {
            address: $('#address').val(),
            zip: $('#zip').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            country: $('#country').val()
          },
          expire: now_time + ($('#minutes').val()*60*1000),
          specifics: $('#specifics').val(),
          price: $('#price').val(),
          phone: 'none'
        }
      });
      Session.set('dash-view','open-orders');  // automatically switch to the open orders view.

      // unset all the form elements. the form is wonky if we don't do this.
      Session.set('order-spot', undefined);
      Session.set('order-food', undefined);
      Session.set('order-type', undefined);
      Session.set('order-address', undefined);
      Session.set('order-zip', undefined);
      Session.set('order-city', undefined);
      Session.set('order-state', undefined);
      Session.set('order-country', undefined);
      Session.set('order-price', undefined);
      Session.set('order-minutes', undefined);
      Session.set('order-specifics', undefined);
    }
  }
});
Template.orderform.rendered = function(){
  var spot = Session.get('order-spot');
  $('.orderform *').hide();
  if (spot == undefined){
    $('#order1').show();
    $('#order1 *').show();
    Session.set('order-spot',1);
  } else {
    for(var i=1;i<=spot; i++){
      $('#order'+i).show();
      $('#order'+i+' *').show();
    }
  }
  $('#order1').val(Session.get('order-food'));
  $('#order2 select').val(Session.get('order-type'));
  $('#address').val(Session.get('order-address'));
  $('#zip').val(Session.get('order-zip'));
  $('#city').val(Session.get('order-city'));
  $('#state').val(Session.get('order-state'));
  $('#country').val(Session.get('order-country'));
  $('#price').val(Session.get('order-price'));
  $('#minutes').val(Session.get('order-minutes'));
  $('#specifics').val(Session.get('order-specifics'));
};
