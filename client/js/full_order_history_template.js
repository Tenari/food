Template.full_order_history.orders = function(){
  return Orders.find({placer: Meteor.userId()}).fetch();
};
Template.full_order_history.chef_name = function(order_id){
  var chef_obj = Meteor.users.find(Orders.find(order_id).fetch()[0].taker).fetch()[0];
  if (chef_obj != undefined)
    return chef_obj.username;
  return "--";
};
