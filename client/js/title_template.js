Template.title.helpers({
  hungry: function(){
    return Meteor.user().profile.hungry;
  },  
  no_orders: function(){
    return Orders.find({placer: Meteor.user()._id, finished: "nottaken"}).fetch().length == 0 || Session.get('dash-view')=='new-order';
  },
  hungry_title: function(){
    var state_str = Session.get('dash-view');
    switch(state_str){
      case 'new-order':
        return "Make me...";
      case 'profile':
        return "Your Profile";
      case 'open-orders':
        return "Your Open Orders";
      case 'started-orders':
        return "Orders En Route";
      case 'need-to-rate':
        return "Orders to Rate";
      default: // full-history
        return "Full Ordering History";
    }
  },
  chef_title: function(){
    var state_str = Session.get('dash-view');
    switch(state_str){
      case 'open-orders':
        return "Pick One!";
      case 'profile':
        return "All about your wonderful self";
      case 'started-orders':
        return "You need to make these.";
      default: // full-history
        return "Full Ordering History";
    }
  }
});
