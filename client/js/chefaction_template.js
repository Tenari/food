Template.chefaction.helpers({
  action: function(){
    return Session.get('chef-action') == undefined;
  },
  up: function(){
    return Session.get('chef-action') == 'signup';
  },
  lin: function(){
    return Session.get('chef-action') == 'login';
  }
});
Template.chefaction.rendered = function(){
  $('.chef-half .landing-action').hide().fadeIn();
};
Template.chefaction.events({
  'click #login': function(){
    chefLogin();
  },
  'click #signup': function(){
    chefSignup();
  },
  'keypress': function(e){
    if(e.which == 13){
      if($('#login').length !=0){
        chefLogin();
      }else if($('#signup').length !=0){
        chefSignup();
      }
    }
  }
});
var chefSignup = function(){
  var user = $('#username').val(),
      pass = $('#password').val(),
      passconf = $('#passwordconf').val();
  if(pass != passconf){
    $('.error').remove();
    $('.chef-half .landing-action').prepend("<div class='error'>Passwords don't match</div>");
  }else{
    Accounts.createUser({
      username: user,
      password: pass,
      profile: {hungry:false} // ensure that the user is NOT a chef (is hungry)
    }, function(err){
      if(err){
        alert(err);
      } else {
        // handle signup
      }
    });
  }
};
var chefLogin = function(){
  var user = $('#username').val(),
      password = $('#password').val();
  Meteor.loginWithPassword(user, password, function(e){
    if (e != undefined){
      $('.error').remove();
      $('.chef-half .landing-action').prepend("<div class='error'>"+e+"</div>");
    }else {
      //handle success
    }
  });
};
