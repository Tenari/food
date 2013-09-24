Template.landing.events({
  'mouseenter .hungry-half':function(){
    $('.hungry-half').removeClass("hungry-sad").addClass('hungry-happy');
  },
  'mouseleave .hungry-half':function(){
    $('.hungry-half').removeClass("hungry-happy").addClass('hungry-sad');
  },
  'mouseenter .chef-half':function(){
    $('.chef-half').removeClass("chef-sad").addClass('chef-happy');
  },
  'mouseleave .chef-half':function(){
    $('.chef-half').removeClass("chef-happy").addClass('chef-sad');
  },
  'click .chef-half': function(){ Session.set('hungry-action',undefined);},
  'click .hungry-half': function(){ Session.set('chef-action',undefined);},
  'click #chef-login': function(){
    Session.set('chef-action','login');
    Session.set('hungry-action', undefined);
  },
  'click #chef-signup': function(){
    Session.set('chef-action','signup');
    Session.set('hungry-action', undefined);
  },
  'click #hungry-signup': function(){
    Session.set('hungry-action','signup');
    Session.set('chef-action', undefined);
  },
  'click #hungry-login': function(){
    Session.set('hungry-action','login');
    Session.set('chef-action', undefined);
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
Template.landing.rendered = function(){
  var hungry = Session.get('hungry');
  if( hungry == false){
    $('.chef-half').addClass('chef-happy');
    $('.hungry-half').addClass('hungry-sad');
  } else if(hungry == true) {
    $('.chef-half').addClass('chef-sad');
    $('.hungry-half').addClass('hungry-happy');
  } else {
    $('.chef-half').addClass('chef-sad');
    $('.hungry-half').addClass('hungry-sad');
  }
};
