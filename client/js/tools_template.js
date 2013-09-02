Template.tools.showTools = function(){
  return Session.get('showTools');
};
Template.tools.events({
  'click input' : function () {
    if(Session.get('showTools'))
      Session.set('showTools', false);
    else
      Session.set('showTools', true);
  },
  'click #logout': function(){
    Meteor.logout();
  }
});
Template.tools.rendered = function(){
  $('.tools ul').hide().fadeIn();
}
