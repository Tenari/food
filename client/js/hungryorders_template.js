Template.hungryorders.orders = function(){
  return Orders.find({placer: Meteor.user()._id}).fetch();
};
Template.hungryorders.events({
  'click .order-link': function(e){
    //clear all the old chef infos
    $('.chef-info').remove();

    var order_id = $(e.target).attr("id");
    var taker_id = Orders.find(order_id).fetch()[0].taker;
    var taker_obj = Meteor.users.find(taker_id).fetch()[0];
    var $container = $(e.target).parent();

    if (Session.get('chef-info') != order_id){
      if(taker_obj != undefined){
        $container.append("<p class='chef-info'><strong>Chef Name:</strong>"+taker_obj.username+"</p>");
      } else{
        $container.append("<p class='chef-info'><strong>Chef Name:</strong> -- </p>");
      }
      Session.set('chef-info', order_id);
    }else{
      Session.set('chef-info', undefined);
    }
  }
});
