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
      password: pass,
      profile: {hungry:true} // ensure that the user is NOT a chef (is hungry)
    }, function(err){
      if(err){
        alert(err);
      } else {
        // handle signup
      }
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

