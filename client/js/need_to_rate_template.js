Template.need_to_rate.chef_name = function(order_id){
  var chef_obj = Meteor.users.find(Orders.find(order_id).fetch()[0].taker).fetch()[0];
  if (chef_obj != undefined)
    return chef_obj.username;
  return "--";
};
Template.need_to_rate.delivered_orders = function(){
  return Orders.find({placer: Meteor.user()._id, finished: "delivered"}).fetch();
};
