Template.hungry.no_orders = function(){
  return Orders.find({placer: Meteor.user()._id}).fetch().length == 0 || Session.get('dash-view') == 'new-order';
};
Template.hungry.en_route_count = function(){
  var count = Orders.find({placer: Meteor.user()._id, finished: "started"}).count();
  if (count==0)
    return "";
  return count;
};
Template.hungry.to_rate_count = function(){
  var count = Orders.find({placer: Meteor.user()._id, finished: "delivered"}).count();
  if (count==0)
    return "";
  return count;
};
Template.hungry.open_count = function(){
  var now_time = new Date().getTime();
  var count = Orders.find({placer: Meteor.user()._id, finished: "nottaken", "details.expire": {$gt: now_time}}).count(); 
  if (count==0)
    return "";
  return count;
};
Template.hungry.view = function(code){
  return Session.get('dash-view') == code;
};
Template.hungry.events({
  'click #new-order': function(){
    Session.set('dash-view', 'new-order');
  },
  'click #profile':function(){
    Session.set('dash-view', 'profile');
  },
  'click #open-orders':function(){
    Session.set('dash-view', 'open-orders');
  },
  'click #started-orders':function(){
    Session.set('dash-view', 'started-orders');
  },
  'click #need-to-rate':function(){
    Session.set('dash-view', 'need-to-rate');
  },
  'click #full-history':function(){
    Session.set('dash-view', 'full-history');
  },
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
  'click .rate-link': function(e){
    var order_id = $(e.target).attr("id");

    if (Session.get(order_id) == true){
      $(e.target).parent().children(".rate-modal").removeClass('hide');
      $('.container').append('<div class="hidden-background"></div>');
      Session.set(order_id, true);
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
