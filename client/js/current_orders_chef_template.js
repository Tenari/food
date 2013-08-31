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
  'click .order-finished-btn': function(e){
    var order_id = $(e.target).data("id") ;
    Orders.update(order_id, {$set: {finished: "delivered"}});
  }
});
