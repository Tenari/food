Template.loggedIn.helpers({
  hungry: function(){
    return Meteor.user().profile.hungry;
  }
});
