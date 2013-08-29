Template.hungryorders.orders = function(){
  return Orders.find({placer: Meteor.user()._id}).fetch();
};
Template.hungryorders.dead_orders = function(){
  var now_time = new Date().getTime();
  return Orders.find({placer: Meteor.user()._id, finished: "nottaken", "details.expire": {$lt: now_time}}).fetch();
};
Template.hungryorders.new_orders = function(){
  var now_time = new Date().getTime();
  return Orders.find({placer: Meteor.user()._id, finished: "nottaken", "details.expire": {$gt: now_time}}).fetch();
};
Template.hungryorders.started_orders = function(){
  return Orders.find({placer: Meteor.user()._id, finished: "started"}).fetch();
};
Template.hungryorders.delivered_orders = function(){
  return Orders.find({placer: Meteor.user()._id, finished: "delivered"}).fetch();
};
Template.hungryorders.old_orders = function(){
  return Orders.find({placer: Meteor.user()._id, finished: "complete"}).fetch();
};
Template.hungryorders.chef_name = function(order_id){
  var chef_obj = Meteor.users.find(Orders.find(order_id).fetch()[0].taker).fetch()[0];
  if (chef_obj != undefined)
    return chef_obj.username;
  return "--";
};
Template.hungryorders.events({
  'click .order-link': function(e){
    var order_id = $(e.target).attr("id");
    var $container = $(e.target).parent();

    if (Session.get(order_id) != true){
      $container.children(".hungry-order-info").removeClass("hide");
      Session.set(order_id, true);
    }else{
      Session.set(order_id, false);
      $container.children(".hungry-order-info").addClass("hide");
    }
  },
  'click #show-expired': function(e){
    var $list = $('#expired-list');
    if ($list.hasClass("hide")){
      $list.removeClass('hide');
    } else {
      $list.addClass('hide');
    }
  }
});
