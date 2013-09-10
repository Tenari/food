Template.need_to_rate.chef_name = function(order_id){
  var chef_obj = Meteor.users.find(Orders.find(order_id).fetch()[0].taker).fetch()[0];
  if (chef_obj != undefined)
    return chef_obj.username;
  return "--";
};
Template.need_to_rate.delivered_orders = function(){
  return Orders.find({placer: Meteor.userId(), finished: "delivered"}).fetch();
};

Template.need_to_rate.rated_orders = function(){
  return Orders.find({taker: Meteor.userId(), finished: "rated"}).fetch();
};
Template.need_to_rate.customer_name = function(order_id){
  var customer_obj = Meteor.users.findOne( Orders.findOne(order_id).placer);
  if (customer_obj != undefined)
    return customer_obj.username;
  return "--";
  
};
