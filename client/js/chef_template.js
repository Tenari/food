Template.chef.orders = function(){
  return Orders.find();
};
Template.chef.open = function(id){
  return Orders.find(id).fetch()[0].taker == "noneyet";
};
Template.chef.events({
  'click .accept': function(e){
    Orders.update($(e.target).data('id'), {$set: {taker: Meteor.userId()}});
  }
});
