Template.layout.helpers({
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
    var count = Orders.find({placer: Meteor.userId(), finished: "nottaken", "details.expire": {$gt: now_time}}).count(); 
    if (count==0)
      return "";
    return "<span class='dash-jewel'>"+count+"</span>";
  },
  chef_open_count_jewel: function(){
    var now_time = new Date().getTime();
    var count = Orders.find({
      taker: "noneyet",
      "details.expire": {$gt: now_time}
    }).count();
    if (count == 0)
      return "";
    return "<span class='dash-jewel'>"+count+"</span>";
  },
  taken_count_jewel: function(){
    var count = Orders.find({
      taker: Meteor.userId(),
      finished: "started"
    }).count();
    if (count == 0)
      return "";
    return "<span class='dash-jewel'>"+count+"</span>";
  }
});


var kill_modal_fn = function(){
  $('.rate-modal').addClass('hide');
  $('.hidden-background').remove();
};

Template.layout.events({
  'click .hidden-background': kill_modal_fn,
  'click .modal-close': kill_modal_fn,
  'click .order-link': function(e){
    var order_id = $(e.target).attr("id");
    var $container = $(e.target).parent();

    if (Session.get(order_id) != true){
      $container.children(".order-info2").removeClass("hide");
      Session.set(order_id, true);
    }else{
      Session.set(order_id, false);
      $container.children(".order-info2").addClass("hide");
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
  },
  'mouseenter .tooltip':function(e){
    var elem = $(e.target);
    var e_off = elem.offset();
    var offset = {
      top: e_off.top - 3,
      left: e_off.left + elem.width() + 5
    };
    var tip = elem.data('tip');


    $('body').prepend("<div class='tip' style='display:none'>"+tip+"</div>");
    $('.tip').offset(offset).fadeIn().css("position","absolute");
  },
  'mouseleave .tooltip':function(e){
    $('.tip').fadeOut(function(){
      $(this).remove();
    });
  }
});
