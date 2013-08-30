Template.current_orders_chef.helpers({
  own_started_orders: function(){
    return Orders.find({
      taker: Meteor.userId(),
      finished: "started"
    }).fetch();
  },
  delivery_order: function(type){
    return type == 'delivery';
  }
});

Template.current_orders_chef.events({
  'click .order-link': function(e){
    var order_id = $(e.target).attr("id");
    var order_obj = Orders.find(order_id).fetch()[0];
    var $container = $(e.target).parent();


    if (Session.get(order_id) != true){
      $container.children(".side-order-info").removeClass("hide");
      Session.set(order_id, true);
    }else{
      Session.set(order_id, false);
      $container.children(".side-order-info").addClass("hide");
    }
  },
  'click .order-finished-btn': function(e){
    var order_id = $(e.target).data("id") ;
    Orders.update(order_id, {$set: {finished: "delivered"}});
  }
});
