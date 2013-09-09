Template.open_orders_chef.helpers({
  open_orders: function(){
    return Meteor.shared.localOrders();
  },
  username: function(id){
    return Meteor.users.find(id).fetch()[0].username;
  },
  expires: function(expire){
    var now_time = new Date().getTime();
    
    return Math.max(0, ((expire - now_time)/1000));
  },
  food_phrasing: function(food){
    switch(food){
      case 'weird':
        return "weird thing";
      case 'meal':
        return "home-cooked meal";
      default:
        return food;
    }
  }
});

Template.open_orders_chef.events({
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
  }
});
