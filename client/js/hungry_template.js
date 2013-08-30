Template.hungry.helpers({
  no_orders: function(){
    return Orders.find({placer: Meteor.user()._id}).fetch().length == 0 || Session.get('dash-view') == 'new-order';
  },
  en_route_count_jewel: function(){
    var count = Orders.find({placer: Meteor.user()._id, finished: "started"}).count();
    if (count==0)
      return "";
    return "<span class='dash-jewel'>"+count+"</span>";
  },
  to_rate_count_jewel: function(){
    var count = Orders.find({placer: Meteor.user()._id, finished: "delivered"}).count();
    if (count==0)
      return "";
    return "<span class='dash-jewel'>"+count+"</span>";
  },
  open_count_jewel: function(){
    var now_time = new Date().getTime();
    var count = Orders.find({placer: Meteor.user()._id, finished: "nottaken", "details.expire": {$gt: now_time}}).count(); 
    if (count==0)
      return "";
    return "<span class='dash-jewel'>"+count+"</span>";
  },
  view: function(code){
    return Session.get('dash-view') == code;
  }
});
Template.hungry.events({
  'click .dash-btn': function(e){
    var val = $(e.target).attr('id');
    Session.set('dash-view', val);
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
