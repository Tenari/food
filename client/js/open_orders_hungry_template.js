Template.open_orders_hungry.new_orders = function(){
  var now_time = new Date().getTime();
  return Orders.find({placer: Meteor.user()._id, finished: "nottaken", "details.expire": {$gt: now_time}}).fetch();
};
Template.open_orders_hungry.dead_orders = function(){
  var now_time = new Date().getTime();
  return Orders.find({placer: Meteor.user()._id, finished: "nottaken", "details.expire": {$lt: now_time}}).fetch();
};
Template.open_orders_hungry.timestamp_to_date = function(timestamp){
  return Date(timestamp);
};
