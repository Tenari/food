Template.landing.events({
  'click .hungry-half': function(){
    if(Session.get('hungry-action')==undefined){
      if(Session.get('hungry')){
        Session.set('hungry', undefined);
      } else {
        Session.set('hungry', true);
      }
      Session.set('chef-action', undefined);
    }
  },
  'click .chef-half': function(){
    if(Session.get('chef-action')==undefined){
      if(Session.get('hungry') == false){
        Session.set('hungry', undefined);
      } else {
        Session.set('hungry', false);
      }
      Session.set('hungry-action', undefined);
    }
  },
  'click #chef-login': function(){
    Session.set('chef-action','login');
  },
  'click #chef-signup': function(){
    Session.set('chef-action','signup');
  },
  'click #hungry-signup': function(){
    Session.set('hungry-action','signup');
  },
  'click #hungry-login': function(){
    Session.set('hungry-action','login');
  },
  'click #hungry-noacct': function(){
     window.location.pathname = "account-less";
  }
});
Template.landing.helpers({
  hungry: function(){
    return Session.get('hungry');
  },
  chef: function(){
    return Session.get('hungry') == false;
  }
});
