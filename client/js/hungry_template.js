Template.hungry.no_orders = function(){
  return Orders.find({placer: Meteor.user()._id, finished: "nottaken"}).fetch().length == 0;
};
