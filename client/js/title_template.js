Template.title.helpers({
  hungry: function(){
    return Meteor.user().profile.hungry;
  }  
});
