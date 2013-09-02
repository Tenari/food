Template.title.helpers({
  get_title: function(){
    var state_str = window.location.pathname;
    if(state_str.match(/profile/ig))
      return "User Profile";
    switch(state_str){
      case Router.path('orderform'):
        return "Make me...";
      case Router.path('open_orders_hungry'):
        return "Your Open Orders";
      case Router.path('started_orders_hungry'):
        return "Orders En Route";
      case Router.path('need_to_rate'):
        return "Orders to Rate";
      case Router.path('open_orders_chef'):
        return "Pick One!";
      case Router.path('current_orders_chef'):
        return "You need to make these.";
      case Router.path('full_order_history'):
        return "Full Ordering History";
      default: // full-history
        return "Nothing much";
    }
  }
});
