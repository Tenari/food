Template.hungryorders.orders = function(){
  return Orders.find({placer: Meteor.user()._id}).fetch();
};
