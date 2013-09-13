// HELPERS
var isValidAddress = function(){
  Meteor.shared.validateAddress('order-address');
  return true;
};

Template.orderform.helpers({
  odds: function(e){
    var final_val = 0;
    var done_orders, total_orders;

    var food = Session.get('order-food');
    var type = Session.get('order-type');
    var address = Session.get('order-address');

    // super basic odds. should get more specific as they fill out the form.
    if (type != undefined && type != ""){
      done_orders = Orders.find({finished: {$in: ["rated","delivered"]}, "details.food": food, "details.type":type}).count();
      total_orders = Orders.find({"details.food": food, "details.type":type}).count();
      final_val = parseInt(done_orders/total_orders*100);
    } else if(food!=undefined && food !=""){
      done_orders = Orders.find({finished: {$in: ["rated","delivered"]}, "details.food": food}).count();
      total_orders = Orders.find({"details.food": food}).count();
      final_val = parseInt(done_orders/total_orders*100);
    }else{
      done_orders = Orders.find({finished: {$in: ["rated","delivered"]}}).count();
      total_orders = Orders.find().count();
      final_val = parseInt(done_orders/total_orders*100);
    }
    if (isNaN(final_val))
      return "--";
    else
      return final_val;
  },
  delivery: function(){
    return Session.get('order-type') == 'delivery';
  },
  formattedCompetingOrdersCount: function(){
    var now = new Date().getTime();
    var count = Orders.find({"details.food": Session.get('order-food'), "details.expire": {$gt: now}}).count();
    switch(count){
      case 0:
        return "are no Orders";
      case 1:
        return "is one Order";
      default:
        return "are " + count + " Orders";
    }
  },
  avgBidCompetingOrders: function(){
    var now = new Date().getTime();
    var competition = Orders.find({"details.food": Session.get('order-food'), "details.expire": {$gt: now}}).fetch();
  
    var sum = 0;
    for (var i = 0; i < competition.length; i++){
      sum = sum + parseInt(competition[i].details.price);
    }
    if(sum == 0) return 0;
    return sum/competition.length;
  },
  showCompetition: function(){
    return Session.get('show-competition');
  }
});
  Template.orderform.validate6= function(){return true;};
  Template.orderform.validate5= function(){
    if ($('#price').val() <= 0){
      $('#price').val('0');
    }
    if ($('#price').val() < 5){
      $('#price-encouragment').remove();
      $('#order5 p:last').append("<p id='price-encouragment' class='error'>You can do better, bro.</p>");
    } else {
      $('#price-encouragment').remove();
    }
    return true;
  };
  Template.orderform.validate4= function(){
    if ($('#minutes').val() <= 0){
      $('#minutes').val('0');
    }
    return true;
  };
  Template.orderform.validate3= function(){
    return isValidAddress();
  };
  Template.orderform.validate2= function(){
    return true;
  };

// EVENTS  
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
    if (isValidAddress()) {
      var now_time = new Date().getTime();
      Orders.insert({
        placer: Meteor.user()._id,
        taker: "noneyet",
        finished: "nottaken",
        details: {
          placed: now_time,
          food: $('#order1').val(),
          type: $('#order2 select').val(),
          max_distance: (Session.get('order-type') == "delivery") ? (15) : (parseInt($('#max_distance').val())),
          location: {
            address: $('#address').val(),
            lat: Session.get('lat'),
            lng: Session.get('lng')
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
      Session.set('order-price', undefined);
      Session.set('order-minutes', undefined);
      Session.set('order-specifics', undefined);
    }
  },
  'click #show-map': function(){
    isValidAddress();

    Session.set('order-spot', 4);
    $('#order4').fadeIn(700);
    $('#order4 *').show();
  },
  'click #competing-orders': function(){
    if(Session.get('show-competition') == true){
      Session.set('show-competition', false);
    } else {
      Session.set('show-competition', true);
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

  if (Meteor.user().profile.location != undefined && Session.get('order-address')==undefined)
    Session.set( 'order-address', Meteor.user().profile.location.address);

  $('#order1').val(Session.get('order-food'));
  $('#order2 select').val(Session.get('order-type'));
  $('#max_distance').val(Session.get('order-max_distance'));
  $('#address').val(Session.get('order-address'));
  $('#price').val(Session.get('order-price'));
  $('#minutes').val(Session.get('order-minutes'));
  $('#specifics').val(Session.get('order-specifics'));
};
