//------------ tools ----------------
Template.tools.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    Meteor.effects.showTools();
  }
});

//------------ landing ----------------
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

//------------ hungryaction ----------------
Template.hungryaction.helpers({
  action: function(){
    return Session.get('hungry-action') == undefined;
  },
  up: function(){
    return Session.get('hungry-action') == 'signup';
  },
  lin: function(){
    return Session.get('hungry-action') == 'login';
  }
});
Template.hungryaction.rendered = function(){
  $('.hungry-half .landing-action').hide().fadeIn();
};
Template.hungryaction.events({
  'click #login': function(){
    hungryLogin();
  },
  'click #signup': function(){
    hungrySignup();
  },
  'keypress': function(e){
    if(e.which == 13){
      if($('#login').length !=0){
        hungryLogin();
      }else if($('#signup').length !=0){
        hungrySignup();
      }
    }
  }
});
var hungrySignup = function(){
  var user = $('#username').val(),
      pass = $('#password').val(),
      passconf = $('#passwordconf').val();
  if(pass != passconf){
    $('.error').remove();
    $('.hungry-half .landing-action').prepend("<div class='error'>Passwords don't match</div>");
  }else{
    Accounts.createUser({
      username: user,
      password: pass
    });
  }
};
var hungryLogin = function(){
  var user = $('#username').val(),
      password = $('#password').val();
  Meteor.loginWithPassword(user, password, function(e){
    if (e != undefined){
      $('.error').remove();
      $('.hungry-half .landing-action').prepend("<div class='error'>"+e+"</div>");
    }else {
      //handle success
    }
  });
};

//------------ chefaction ----------------
Template.chefaction.helpers({
  action: function(){
    return Session.get('chef-action') == undefined;
  }
});
Template.chefaction.rendered = function(){
  $('.chef-half .landing-action').hide().fadeIn();
};
