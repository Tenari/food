Template.chef.helpers({
  view: function(code){
    return Session.get('dash-view') == code;
  },
  open_count_jewel: function(){
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

Template.chef.events({
  'click .dash-btn':function(e){
    Session.set('dash-view', $(e.target).attr('id'));
  }
});
