Template.chef.orders = function(){
  return Orders.find();
};
Template.chef.open = function(id){
  var order_obj = Orders.find(id).fetch()[0];
  var now_time = new Date().getTime();
  return (order_obj.taker == "noneyet")           // no one has taken it yet.
         && (order_obj.details.expire > now_time);// it has not expired yet.
};
Template.chef.own_started_order = function(id){
  var order_obj = Orders.find(id).fetch()[0];
  return (order_obj.taker == Meteor.user()._id)
         && (order_obj.finished == "started");
};
Template.chef.own_delivered_order = function(id){
  var order_obj = Orders.find(id).fetch()[0];
  return (order_obj.taker == Meteor.user()._id)
         && (order_obj.finished == "delivered");
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
  
  return Math.max(0, ((expire - now_time)/1000));
};
Template.chef.food_phrasing = function(food){
  switch(food){
    case 'weird':
      return "weird thing";
    case 'meal':
      return "home-cooked meal";
    default:
      return food;
  }
};
Template.chef.events({
  'click .accept': function(e){
    Orders.update($(e.target).data('id'), {$set: {taker: Meteor.userId()}});
    Orders.update($(e.target).data('id'), {$set: {finished: "started"}});
  },
  'click .remove': function(e){
    $(e.target).parent().parent().remove();
  },
  'click .more-info': function(e){
    $(e.target).parent().parent().children('.rate-modal').removeClass('hide');
    $('.container').append('<div class="hidden-background"></div>');
  },
  'click #show-current-orders': function(e){
    if (Session.get('show-current-orders')){
      Session.set('show-current-orders', false);
    }else{
      Session.set('show-current-orders', true);
    }
  },
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
