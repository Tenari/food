Template.chef.orders = function(){
  return Orders.find();
};
Template.chef.open = function(id){
  return Orders.find(id).fetch()[0].taker == "noneyet";
};
Template.chef.own_order = function(id){
  return Orders.find(id).fetch()[0].taker == Meteor.user()._id;
};
Template.chef.events({
  'click .accept': function(e){
    Orders.update($(e.target).data('id'), {$set: {taker: Meteor.userId()}});
  },
  'click .remove': function(e){
    $(e.target).parent().parent().remove();
  }
});
