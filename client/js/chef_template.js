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
Template.chef.delivery_order = function(type){
  return type == 'delivery';
};
Template.chef.username = function(id){
  return Meteor.users.find(id).fetch()[0].username;
};
Template.chef.expires = function(expire){
  var now_time = new Date().getTime();
  
  return Math.max(0, (expire - now_time));
};
Template.chef.events({
  'click .accept': function(e){
    Orders.update($(e.target).data('id'), {$set: {taker: Meteor.userId()}});
    Orders.update($(e.target).data('id'), {$set: {finished: "started"}});
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
  },
  'click .order-link': function(e){
    //clear all the old chef infos

    var order_id = $(e.target).attr("id");
    var order_obj = Orders.find(order_id).fetch()[0];
    var $container = $(e.target).parent();


    if (Session.get('side-order-info') != order_id){
      if(order_obj != undefined){
        $container.children(".side-order-info").removeClass("hide");
      } else{
        $container.append("<div class='side-order-info'><strong>Price: </strong> -- </div>");
      }
      Session.set('side-order-info', order_id);
    }else{
      Session.set('side-order-info', undefined);
      $container.children(".side-order-info").addClass("hide");
    }
  }
});
