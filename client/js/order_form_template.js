Template.orderform.events({
  'change #order1': function(){
    $('#order2 *').show();
    $('#order2').fadeIn(700);
  },
  'change #order2':function(){
    $('#order3 *').show();
    $('#order3').fadeIn(700);
  },
  'change #order3':function(){
    $('#submit').fadeIn(700);
  },
  'click #submit':function(){
    if (Template.orderform.isValid()) {
      Orders.insert({
        placer: Meteor.user()._id,
        taker: "noneyet",
        details: {
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
          expire: new Date().getTime(),
          specifics: '',
          price: 5,
          phone: 'none'
        }
      });
    }
  }
});
Template.orderform.rendered = function(){
  $('.orderform *').hide();
  $('#order1').show();
  $('#order1 *').show();
  Session.set('order-spot',1);
};
Template.orderform.delivery = function(){
  return $('#order2 select').val() == 'delivery';
};
Template.orderform.isValid = function(){
  var address, zip, city, state, country;
  zip = Template.orderform.zipgood();
//  return address && zip && city && state && country;
  return zip;
};
Template.orderform.zipgood = function(){
  var zip;
  var zip_val = $('#zip').val().trim();
  zip = (zip_val.length == 5)
        &&
        (!zip_val.match(/[a-z]/ig));
  return zip;
};
