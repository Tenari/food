Template.orderform.events({
  'change #order1': function(){
    $('#order2 *').show();
    $('#order2').fadeIn(700);
  }
});
Template.orderform.rendered = function(){
  $('.orderform *').hide();
  $('#order1').show();
  $('#order1 *').show();
  Session.set('order-spot',1);
}
