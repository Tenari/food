Template.hungry.no_orders = function(){
  return Orders.find({placer: Meteor.user()._id, finished: "nottaken"}).fetch().length == 0 || Session.get('new-order')==true;
};
Template.hungry.events({
  'click #new-order': function(){
    Session.set('new-order', true);
  }
});
