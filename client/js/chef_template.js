Template.chef.orders = function(){
  return Orders.find();
};
Template.chef.open = function(id){
  return Orders.find(id).fetch()[0].taker == "noneyet";
};
Template.chef.own_order = function(id){
  return Orders.find(id).fetch()[0].taker == Meteor.user()._id;
};
Template.chef.show_current_orders = function(){
  return Session.get('show-current-orders') == true;
};
Template.chef.events({
  'click .accept': function(e){
    Orders.update($(e.target).data('id'), {$set: {taker: Meteor.userId()}});
  },
  'click .remove': function(e){
    $(e.target).parent().parent().remove();
  },
  'click #show-current-orders': function(e){
    if (Session.get('show-current-orders')){
      Session.set('show-current-orders', false);
    }else{
      Session.set('show-current-orders', true);
    }
  }
});
