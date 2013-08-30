Template.open_orders_hungry.helpers({
  new_orders: function(){
    var now_time = new Date().getTime();
    return Orders.find({placer: Meteor.user()._id, finished: "nottaken", "details.expire": {$gt: now_time}}).fetch();
  },
  dead_orders: function(){
    var now_time = new Date().getTime();
    return Orders.find({placer: Meteor.user()._id, finished: "nottaken", "details.expire": {$lt: now_time}}).fetch();
  },
  timestamp_to_date: function(timestamp){
    var date = new Date(timestamp);
    return date.toString();
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

// event listeners
Template.open_orders_hungry.events({
  'click .more-info': function(e){
    $(e.target).parent().children('.rate-modal').removeClass('hide');
    $('.container').append('<div class="hidden-background"></div>');
  }
});
